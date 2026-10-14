<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Home', [
            'categories' => Category::all(['id', 'name'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id'     => 'required|exists:categories,id',
            'reporter_name'   => 'required|string|max:255',
            'reporter_phone'  => 'required|string|max:20',
            'reporter_email'  => 'nullable|email',
            'title'           => 'required|string|max:255',
            'description'     => 'required|string',
            'district'        => 'required|string',
            'village'         => 'required|string',
            'full_location'   => 'required|string',
            'photo'           => 'required|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        // Upload Foto
        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('complaints', 'public');
        }

        // Generate Kode Tiket Unik (misal: LPR-20261008-AB12)
        $validated['ticket_code'] = 'LPR-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        $complaint = Complaint::create($validated);

        return redirect()->route('home')->with('success', [
            'message'     => 'Laporan Anda berhasil dikirim!',
            'ticket_code' => $complaint->ticket_code,
        ]);
    }
}