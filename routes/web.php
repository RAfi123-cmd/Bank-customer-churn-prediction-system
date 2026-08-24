<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::middleware(['auth'])->group(function () {

    Route::get('/customers', [CustomerController::class, 'index'])
        ->name('customers.index');

    Route::get('/customers/create', [CustomerController::class, 'create'])
        ->name('customers.create');

    Route::post('/customers', [CustomerController::class, 'store'])
        ->name('customers.store');

    Route::get("/customers/{customer}/edit", [CustomerController::class, 'edit'])->name('customers.edit');
    Route::put("/customers/{customer}", [CustomerController::class, 'update'])->name('customers.update');

    Route::post("/customers/{customer}/predict", [CustomerController::class, 'predict'])->name('customers.predict');
    Route::post("/customers/predict-batch", [CustomerController::class, 'predictBatch'])->name('customers.predict-batch');
    Route::delete("/customers/{customer}", [CustomerController::class, 'destroy'])->name('customers.destroy');

    Route::get('/predictions', [PredictionController::class, 'index'])->name('prediction.index');
    Route::get('/prediction/search-customers', [PredictionController::class, 'searchCustomers'])->name('prediction.search-customers');
    Route::post('/prediction', [PredictionController::class, 'store'])->name('prediction.store');
    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
