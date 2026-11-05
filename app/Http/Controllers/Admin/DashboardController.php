<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $base = Complaint::query();
        $total = (clone $base)->count();
        $active = (clone $base)->whereNotIn('verification_status', ['selesai', 'ditolak', 'duplikasi'])->count();

        return response()->json([
            'stats' => [
                'total' => $total,
                'pending' => (clone $base)->whereIn('verification_status', ['menunggu', 'ditelaah', 'butuh_bukti'])->count(),
                'active' => $active,
                'completed_this_month' => (clone $base)->where('verification_status', 'selesai')->whereMonth('completed_at', now()->month)->count(),
                'completion_rate' => $total ? round((clone $base)->where('verification_status', 'selesai')->count() / $total * 100, 1) : 0,
            ],
            'categories' => Category::withCount('complaints')->orderByDesc('complaints_count')->get(['id', 'name', 'slug']),
            'opd_load' => Complaint::query()->whereNotNull('assigned_department')->whereNotIn('verification_status', ['selesai', 'ditolak'])
                ->select('assigned_department', DB::raw('count(*) as total'))->groupBy('assigned_department')->orderByDesc('total')->get(),
            'tickets' => Complaint::with(['category', 'attachments'])->whereNotIn('verification_status', ['selesai', 'ditolak'])
                ->latest()->limit(100)->get()->map(fn (Complaint $complaint) => $this->dispatchRow($complaint)),
        ]);
    }

    public function statistics(Request $request)
    {
        $period = $request->string('period', '30 Hari')->toString();
        $start = match ($period) {
            '7 Hari' => now()->subDays(6)->startOfDay(),
            '90 Hari' => now()->subDays(89)->startOfDay(),
            '2026' => now()->startOfYear(),
            default => now()->subDays(29)->startOfDay(),
        };
        $complaints = Complaint::query()->where('created_at', '>=', $start);

        return response()->json([
            'period' => $period,
            'summary' => [
                'total' => (clone $complaints)->count(),
                'completed' => (clone $complaints)->where('verification_status', 'selesai')->count(),
                'open' => (clone $complaints)->whereNotIn('verification_status', ['selesai', 'ditolak', 'duplikasi'])->count(),
            ],
            'by_status' => (clone $complaints)->select('verification_status', DB::raw('count(*) as total'))->groupBy('verification_status')->get(),
            'by_category' => (clone $complaints)->join('categories', 'categories.id', '=', 'complaints.category_id')
                ->select('categories.name', 'categories.slug', DB::raw('count(*) as total'))->groupBy('categories.id', 'categories.name', 'categories.slug')->orderByDesc('total')->get(),
            'by_day' => (clone $complaints)->selectRaw('DATE(created_at) as date, count(*) as total')->groupBy('date')->orderBy('date')->get(),
            'by_department' => (clone $complaints)->whereNotNull('assigned_department')->select('assigned_department', DB::raw('count(*) as total'), DB::raw("sum(case when verification_status = 'selesai' then 1 else 0 end) as completed"))->groupBy('assigned_department')->orderByDesc('total')->get(),
        ]);
    }

    public function geoJson(Request $request)
    {
        $reports = Complaint::with('category')
            ->whereNotNull('latitude')->whereNotNull('longitude')
            ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('slug', $request->string('category'))))
            ->when($request->filled('district'), fn ($query) => $query->where('district', $request->string('district')))
            ->latest()->get();

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $reports->map(fn (Complaint $complaint) => [
                'type' => 'Feature',
                'geometry' => ['type' => 'Point', 'coordinates' => [(float) $complaint->longitude, (float) $complaint->latitude]],
                'properties' => [
                    'ticket' => $complaint->ticket_code,
                    'title' => $complaint->title,
                    'category' => $complaint->category->slug,
                    'category_label' => $complaint->category->name,
                    'district' => $complaint->district,
                    'status' => $complaint->verification_status,
                    'priority' => $complaint->priority,
                ],
            ]),
        ]);
    }

    private function dispatchRow(Complaint $complaint): array
    {
        $stage = match ($complaint->verification_status) {
            'valid' => 'Diverifikasi',
            'diteruskan' => 'Diteruskan',
            'dikerjakan' => 'Dikerjakan',
            'selesai' => 'Selesai',
            default => 'Diverifikasi',
        };

        return [
            'id' => $complaint->ticket_code,
            'ago' => $complaint->created_at->diffForHumans(),
            'category' => $complaint->category->name,
            'desc' => $complaint->description,
            'kecamatan' => str($complaint->district)->slug()->value(),
            'kecLabel' => 'Kec. '.$complaint->district,
            'address' => $complaint->full_location,
            'dinas' => $complaint->assigned_department ?: 'dpu',
            'priority' => $complaint->priority,
            'stage' => $stage,
            'reporter' => $complaint->reporter_name,
            'phone' => $complaint->reporter_phone,
            'instruction' => $complaint->instruction,
            'image' => $complaint->attachments->first() ? asset('storage/'.$complaint->attachments->first()->path) : null,
            'action' => ['label' => 'Disposisi', 'icon' => 'arrow_forward', 'primary' => true],
        ];
    }
}
