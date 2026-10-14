<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Public/Home'));
Route::get('/cek-laporan', fn () => Inertia::render('Public/TrackReport'));

// Admin
Route::prefix('admin')->group(function () {
    Route::get('/', fn () => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'));
    Route::get('/verifikasi', fn () => Inertia::render('Admin/Verifikasi'))->name('admin.verifikasi');
    Route::get('/statistik', fn () => Inertia::render('Admin/Statistik'))->name('admin.statistik');
    Route::get('/peta', fn () => Inertia::render('Admin/Peta'))->name('admin.peta');
});

