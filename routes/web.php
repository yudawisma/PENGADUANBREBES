<?php

use App\Http\Controllers\Admin\ComplaintAdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Public\ComplaintController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ComplaintController::class, 'index'])->name('home');
Route::get('/cek-laporan', fn () => Inertia::render('Public/TrackReport'));
Route::get('/api/categories', [ComplaintController::class, 'categories'])->name('api.categories');
Route::post('/api/reports', [ComplaintController::class, 'store'])->name('api.reports.store');
Route::get('/api/tickets/{ticketCode}', [ComplaintController::class, 'show'])->name('api.tickets.show');

Route::prefix('api/admin')->name('api.admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/statistics', [DashboardController::class, 'statistics'])->name('statistics');
    Route::get('/map.geojson', [DashboardController::class, 'geoJson'])->name('map.geojson');
    Route::get('/queue', [ComplaintAdminController::class, 'index'])->name('queue');
    Route::get('/queue/export', [ComplaintAdminController::class, 'export'])->name('queue.export');
    Route::post('/queue/bulk-verify', [ComplaintAdminController::class, 'bulkVerify'])->name('queue.bulk-verify');
    Route::get('/queue/{ticketCode}', [ComplaintAdminController::class, 'showByTicket'])->name('queue.show');
    Route::patch('/queue/{ticketCode}/verification', [ComplaintAdminController::class, 'updateVerification'])->name('queue.verification');
    Route::patch('/queue/{ticketCode}/dispatch', [ComplaintAdminController::class, 'dispatch'])->name('queue.dispatch');
});

// Admin
Route::prefix('admin')->group(function () {
    Route::get('/', fn () => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'));
    Route::get('/verifikasi', fn () => Inertia::render('Admin/Verifikasi'))->name('admin.verifikasi');
    Route::get('/statistik', fn () => Inertia::render('Admin/Statistik'))->name('admin.statistik');
    Route::get('/peta', fn () => Inertia::render('Admin/Peta'))->name('admin.peta');
});
