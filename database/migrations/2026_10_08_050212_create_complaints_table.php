<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_code')->unique(); // Kode unik lacak aduan: LPR-20261008-XXXX
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            // Data Pelapor (Tanpa Akun)
            $table->string('reporter_name');
            $table->string('reporter_phone');
            $table->string('reporter_email')->nullable();

            // Detail Laporan
            $table->string('title');
            $table->text('description');
            $table->string('district'); // Kecamatan (misal: Jatibarang, Brebes, Bumiayu)
            $table->string('village');  // Desa/Kelurahan
            $table->text('full_location'); // Alamat detail / Nama Jalan

            // Lampiran Foto & Status
            $table->string('photo_path')->nullable();
            $table->enum('status', ['pending', 'process', 'completed', 'rejected'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
