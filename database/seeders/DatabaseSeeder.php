<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        foreach ([
            'infrastruktur' => 'Jalan Rusak & Jembatan',
            'lampu' => 'Lampu Jalan & PJU',
            'drainase' => 'Banjir & Drainase',
            'kebersihan' => 'Sampah & Kebersihan',
            'fasilitas' => 'Fasilitas Umum',
            'kesehatan' => 'Kesehatan & Puskesmas',
            'pendidikan' => 'Pendidikan & Sekolah',
            'pertanian' => 'Lingkungan & Pertanian',
            'pelayanan' => 'Pelayanan Publik & KTP',
            'sosial' => 'Masalah Sosial & Bansos',
        ] as $slug => $name) {
            Category::firstOrCreate(['slug' => $slug], ['name' => $name]);
        }
    }
}
