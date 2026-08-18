<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'dynamic.role_permission'])->prefix('admin')->group(function() {
    Route::controller(CustomerController::class)->group(function (){
        Route::get('costumers', 'index')->name('admin.customers.index');
    });
});
?>