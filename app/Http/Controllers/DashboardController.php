<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Prediction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $totalCustomers = Customer::count();

        $highRisk = Prediction::where('risk_level', 'high')->count();

        $mediumRisk = Prediction::where('risk_level', 'medium')->count();

        $lowRisk = Prediction::where('risk_level', 'low')->count();

        $churnCustomers = $highRisk + $mediumRisk;

        $safeCustomers = $lowRisk;

       $churnRate =$totalCustomers > 0 ? round(($churnCustomers / $totalCustomers) * 100, 2) : 0;

       return Inertia::render('Dashboard', [
        'statistics' => [
            'totalCustomers' => $totalCustomers,
            'churnCustomers' => $churnCustomers,
            'safeCustomers' => $safeCustomers, 
            'churnRate' => $churnCustomers,
            'highRisk' => $highRisk,
            'mediumRisk' => $mediumRisk,
            'lowRisk' => $lowRisk,
        ],
       ]);
    }
}
