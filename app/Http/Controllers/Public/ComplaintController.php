<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Home', [
            'categories' => Category::query()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function categories()
    {
        return response()->json(Category::query()->orderBy('name')->get(['id', 'name', 'slug']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', Rule::in(Category::query()->pluck('slug')->merge(Category::query()->pluck('name'))->all())],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:10000'],
            'kecamatan' => ['required', 'string', 'max:120'],
            'desa' => ['required', 'string', 'max:120'],
            'alamat' => ['nullable', 'string', 'max:1000'],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'agree' => ['accepted'],
            'files' => ['nullable', 'array', 'max:8'],
            'files.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        ]);

        $complaint = DB::transaction(function () use ($request, $validated) {
            $category = Category::where('slug', $validated['category'])
                ->orWhere('name', $validated['category'])
                ->firstOrFail();
            do {
                $ticketCode = sprintf('BRB-%s-%06d', now()->format('Y'), random_int(0, 999999));
            } while (Complaint::where('ticket_code', $ticketCode)->exists());

            $complaint = Complaint::create([
                'ticket_code' => $ticketCode,
                'category_id' => $category->id,
                'reporter_name' => $validated['name'] ?: 'Anonim',
                'reporter_phone' => $validated['phone'] ?? '',
                'title' => $validated['title'],
                'description' => $validated['description'],
                'district' => $validated['kecamatan'],
                'village' => $validated['desa'],
                'full_location' => $validated['alamat'] ?: 'Lokasi belum dirinci',
                'latitude' => $validated['lat'] ?? null,
                'longitude' => $validated['lng'] ?? null,
                'status' => 'pending',
                'verification_status' => 'menunggu',
                'channel' => 'public',
            ]);

            foreach ($request->file('files', []) as $file) {
                $path = $file->store('complaints', 'public');
                $complaint->attachments()->create([
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }

            $complaint->update(['photo_path' => $complaint->attachments()->value('path')]);
            $complaint->events()->create([
                'status' => 'menunggu',
                'message' => 'Laporan diterima dan menunggu verifikasi petugas.',
            ]);

            return $complaint;
        });

        return response()->json([
            'message' => 'Laporan berhasil dikirim.',
            'ticket' => $complaint->ticket_code,
            'complaint' => ['id' => $complaint->id, 'ticket_code' => $complaint->ticket_code],
        ], 201);
    }

    public function show(string $ticketCode)
    {
        $complaint = Complaint::query()
            ->with(['category:id,name,slug', 'attachments:id,complaint_id,path', 'events:id,complaint_id,status,message,created_at'])
            ->where('ticket_code', strtoupper($ticketCode))
            ->firstOrFail();

        return response()->json([
            'ticket' => [
                'id' => $complaint->ticket_code,
                'code' => $complaint->ticket_code,
                'title' => $complaint->title,
                'description' => $complaint->description,
                'category' => $complaint->category->name,
                'status' => $complaint->verification_status,
                'district' => $complaint->district,
                'village' => $complaint->village,
                'location' => $complaint->full_location,
                'department' => $complaint->assigned_department,
                'reported_at' => $complaint->created_at,
                'attachments' => $complaint->attachments->map(fn ($attachment) => [
                    'url' => asset('storage/'.$attachment->path),
                    'name' => $attachment->original_name,
                ]),
                'timeline' => $complaint->events->map(fn ($event) => [
                    'status' => $event->status,
                    'message' => $event->message,
                    'time' => $event->created_at,
                ]),
            ],
        ]);
    }
}
