<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ComplaintAdminController extends Controller
{
    private const VERIFICATION_STATES = ['menunggu', 'ditelaah', 'butuh_bukti', 'duplikasi', 'valid', 'diteruskan', 'dikerjakan', 'selesai', 'ditolak'];

    public function index(Request $request)
    {
        $complaints = $this->filtered($request)
            ->with(['category:id,name,slug', 'attachments:id,complaint_id,path'])
            ->latest()
            ->paginate(min(max($request->integer('per_page', 15), 1), 100))
            ->withQueryString()
            ->through(fn (Complaint $complaint) => $this->queueRow($complaint));

        return response()->json($complaints);
    }

    public function show(Complaint $complaint)
    {
        return response()->json($complaint->load(['category', 'attachments', 'events.user:id,name']));
    }

    public function showByTicket(string $ticketCode)
    {
        $complaint = Complaint::where('ticket_code', $ticketCode)->firstOrFail();

        return $this->show($complaint);
    }

    public function updateVerification(Request $request, string $ticketCode)
    {
        $complaint = Complaint::where('ticket_code', $ticketCode)->firstOrFail();
        $validated = $request->validate([
            'status' => ['required', Rule::in(self::VERIFICATION_STATES)],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        $this->changeStatus($complaint, $validated['status'], $validated['message'] ?? null);

        return response()->json($this->queueRow($complaint->fresh()->load(['category', 'attachments'])));
    }

    public function bulkVerify(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['required', 'array', 'min:1', 'max:100'],
            'ids.*' => ['required', 'string', 'distinct', 'max:64'],
        ]);

        $count = DB::transaction(function () use ($validated) {
            $complaints = Complaint::whereIn('ticket_code', $validated['ids'])
                ->whereIn('verification_status', ['menunggu', 'ditelaah'])
                ->get();

            foreach ($complaints as $complaint) {
                $this->changeStatus($complaint, 'valid', 'Laporan diverifikasi secara massal.');
            }

            return $complaints->count();
        });

        return response()->json(['verified' => $count]);
    }

    public function dispatch(Request $request, string $ticketCode)
    {
        $complaint = Complaint::where('ticket_code', $ticketCode)->firstOrFail();
        $validated = $request->validate([
            'stage' => ['required', Rule::in(['Diverifikasi', 'Diteruskan', 'Dikerjakan', 'Selesai'])],
            'dinas' => ['required', 'string', 'max:120'],
            'pejabat' => ['nullable', 'string', 'max:255'],
            'instruction' => ['nullable', 'string', 'max:5000'],
            'notify' => ['sometimes', 'boolean'],
        ]);

        $status = [
            'Diverifikasi' => 'valid',
            'Diteruskan' => 'diteruskan',
            'Dikerjakan' => 'dikerjakan',
            'Selesai' => 'selesai',
        ][$validated['stage']];

        DB::transaction(function () use ($complaint, $validated, $status) {
            $complaint->forceFill([
                'assigned_department' => $validated['dinas'],
                'assigned_officer' => $validated['pejabat'] ?? null,
                'instruction' => $validated['instruction'] ?? null,
            ])->save();

            $this->changeStatus($complaint, $status, $validated['instruction'] ?: 'Status penanganan diperbarui.');
        });

        return response()->json($this->queueRow($complaint->fresh()->load(['category', 'attachments'])));
    }

    public function export(Request $request)
    {
        $rows = $this->filtered($request)->with('category')->latest()->get();
        $filename = 'laporan-brebes-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($rows) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Kode Tiket', 'Judul', 'Kategori', 'Kecamatan', 'Desa', 'Status', 'OPD', 'Dibuat']);
            foreach ($rows as $complaint) {
                fputcsv($output, [
                    $complaint->ticket_code, $complaint->title, $complaint->category->name,
                    $complaint->district, $complaint->village, $complaint->verification_status,
                    $complaint->assigned_department, $complaint->created_at->toDateTimeString(),
                ]);
            }
            fclose($output);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function filtered(Request $request)
    {
        return Complaint::query()
            ->when($request->filled('status'), fn ($query) => $query->where('verification_status', $request->string('status')))
            ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('slug', $request->string('category'))))
            ->when($request->filled('kecamatan'), fn ($query) => $query->where('district', 'like', '%'.$request->string('kecamatan').'%'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%'.$request->string('search').'%';
                $query->where(fn ($nested) => $nested->where('ticket_code', 'like', $search)
                    ->orWhere('title', 'like', $search)
                    ->orWhere('reporter_name', 'like', $search));
            });
    }

    private function changeStatus(Complaint $complaint, string $status, ?string $message): void
    {
        $legacyStatus = match ($status) {
            'selesai' => 'completed',
            'ditolak', 'duplikasi' => 'rejected',
            'menunggu', 'butuh_bukti' => 'pending',
            default => 'process',
        };

        $complaint->forceFill([
            'verification_status' => $status,
            'status' => $legacyStatus,
            'verified_at' => in_array($status, ['valid', 'diteruskan', 'dikerjakan', 'selesai'], true) ? ($complaint->verified_at ?? now()) : $complaint->verified_at,
            'completed_at' => $status === 'selesai' ? now() : $complaint->completed_at,
        ])->save();

        $complaint->events()->create([
            'user_id' => auth()->id(),
            'status' => $status,
            'message' => $message,
        ]);
    }

    private function queueRow(Complaint $complaint): array
    {
        $attachment = $complaint->attachments->first();

        return [
            'id' => $complaint->ticket_code,
            'databaseId' => $complaint->id,
            'channel' => ['icon' => 'public', 'label' => 'Web Portal'],
            'title' => $complaint->title,
            'desc' => $complaint->description,
            'reporter' => $complaint->reporter_name,
            'note' => $complaint->reporter_phone ? 'Kontak tersedia' : 'Pelapor anonim',
            'noteStrong' => (bool) $complaint->reporter_phone,
            'category' => $complaint->category->slug,
            'categoryLabel' => $complaint->category->name,
            'kecamatan' => str($complaint->district)->slug()->value(),
            'kecLabel' => 'Kec. '.$complaint->district,
            'photos' => $complaint->attachments->count(),
            'geotag' => ['ok' => $complaint->latitude !== null && $complaint->longitude !== null, 'sub' => $complaint->latitude !== null ? 'Koordinat GPS tersimpan' : 'Koordinat tidak tersedia'],
            'date' => $complaint->created_at->translatedFormat('d M Y'),
            'time' => $complaint->created_at->format('H:i').' WIB ('.$complaint->created_at->diffForHumans().')',
            'hot' => $complaint->priority === 'darurat',
            'status' => in_array($complaint->verification_status, ['diteruskan', 'dikerjakan', 'selesai'], true)
                ? 'valid'
                : $complaint->verification_status,
            'verifier' => $complaint->assigned_department ?: 'Belum ada verifikator',
            'image' => $attachment ? asset('storage/'.$attachment->path) : null,
            'department' => $complaint->assigned_department,
        ];
    }
}
