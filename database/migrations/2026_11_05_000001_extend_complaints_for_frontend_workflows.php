<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->unsignedInteger('geo_accuracy')->nullable();
            $table->string('verification_status')->default('menunggu')->index();
            $table->string('assigned_department')->nullable();
            $table->string('assigned_officer')->nullable();
            $table->text('instruction')->nullable();
            $table->string('priority')->default('normal');
            $table->string('channel')->default('public');
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('completed_at')->nullable();
        });

        Schema::create('complaint_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->constrained()->cascadeOnDelete();
            $table->string('path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size');
            $table->timestamps();
        });

        Schema::create('complaint_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status');
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaint_events');
        Schema::dropIfExists('complaint_attachments');
        Schema::table('complaints', function (Blueprint $table) {
            $table->dropColumn([
                'latitude', 'longitude', 'geo_accuracy', 'verification_status', 'assigned_department',
                'assigned_officer', 'instruction', 'priority', 'channel', 'verified_at', 'completed_at',
            ]);
        });
    }
};
