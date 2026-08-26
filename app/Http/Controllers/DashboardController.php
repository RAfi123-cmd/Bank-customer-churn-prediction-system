<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Prediction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $totalCustomers = Customer::count();

        $latestPerCustomer = Prediction::query()
            ->selectRaw('customer_id, MAX(predicted_at) as latest_predicted_at')
            ->groupBy('customer_id');

        $latestPredictionsQuery = Prediction::query()
            ->joinSub($latestPerCustomer, 'latest', function ($join) {
                $join->on('predictions.customer_id', '=', 'latest.customer_id')
                    ->on('predictions.predicted_at', '=', 'latest.latest_predicted_at');
            });

        $riskCounts = (clone $latestPredictionsQuery)
            ->select('risk_level', DB::raw('count(*) as total'))
            ->groupBy('risk_level')
            ->pluck('total', 'risk_level');

        $highRisk = (int) ($riskCounts['high'] ?? 0);
        $mediumRisk = (int) ($riskCounts['medium'] ?? 0);
        $lowRisk = (int) ($riskCounts['low'] ?? 0);
        $totalPredicted = $highRisk + $mediumRisk + $lowRisk;
        $churnRate = $totalPredicted > 0 ? round(($highRisk / $totalPredicted) * 100, 2) : 0;

        // Distribusi risiko per negara (prediksi terbaru per nasabah)
        $countryRaw = (clone $latestPredictionsQuery)
            ->join('customers', 'customers.id', '=', 'predictions.customer_id')
            ->select('customers.country', 'predictions.risk_level', DB::raw('count(*) as total'))
            ->groupBy('customers.country', 'predictions.risk_level')
            ->get()
            ->groupBy('country');

        $trendByCountry = $countryRaw->map(function ($rows, $country) {
            $high = (int) ($rows->firstWhere('risk_level', 'high')->total ?? 0);
            $medium = (int) ($rows->firstWhere('risk_level', 'medium')->total ?? 0);
            $low = (int) ($rows->firstWhere('risk_level', 'low')->total ?? 0);
            return [
                'country' => $country,
                'high' => $high,
                'medium' => $medium,
                'low' => $low,
                'total' => $high + $medium + $low,
            ];
        })
        ->sortByDesc('total')
        ->values();

        // Churn rate (%) per bulan - tetap ada untuk chart line terpisah
        $churnRateTrend = Prediction::query()
            ->selectRaw("TO_CHAR(predicted_at, 'YYYY-MM') as month, risk_level, count(*) as total")
            ->where('predicted_at', '>=', now()->subMonths(6)->startOfMonth())
            ->groupByRaw("TO_CHAR(predicted_at, 'YYYY-MM'), risk_level")
            ->orderBy('month')
            ->get()
            ->groupBy('month')
            ->map(function ($rows, $month) {
                $high = (int) ($rows->firstWhere('risk_level', 'high')->total ?? 0);
                $medium = (int) ($rows->firstWhere('risk_level', 'medium')->total ?? 0);
                $low = (int) ($rows->firstWhere('risk_level', 'low')->total ?? 0);
                $total = $high + $medium + $low;
                return [
                    'month' => $month,
                    'rate' => $total > 0 ? round(($high / $total) * 100, 2) : 0,
                ];
            })
            ->values();

        $topRiskyCustomers = (clone $latestPredictionsQuery)
            ->with('customer')
            ->orderByDesc('churn_probability')
            ->limit(5)
            ->get()
            ->map(fn (Prediction $p) => [
                'id' => $p->id,
                'customer_name' => $p->customer?->surname ?? 'Nasabah tidak ditemukan',
                'customer_number' => $p->customer?->customer_id,
                'churn_probability' => $p->churn_probability,
                'risk_level' => $p->risk_level,
            ]);
        $lowRiskCustomers = (clone $latestPredictionsQuery)
            ->with('customer')
            ->orderBy('churn_probability')
            ->limit(5)
            ->get()
            ->map(fn (Prediction $p) => [
                'id' => $p->id,
                'customer_name' => $p->customer?->surname ?? 'Nasabah tidak ditemukan',
                'customer_number' => $p->customer?->customer_id,
                'churn_probability' => $p->churn_probability,
                'risk_level' => $p->risk_level,
            ]);



        return Inertia::render('Dashboard', [
            'stats' => [
                'total_customers' => $totalCustomers,
                'high_risk' => $highRisk,
                'medium_risk' => $mediumRisk,
                'low_risk' => $lowRisk,
                'total_predicted' => $totalPredicted,
                'churn_rate' => $churnRate,
            ],
            'trendByCountry' => $trendByCountry,
            'churnRateTrend' => $churnRateTrend,
            'topRiskyCustomers' => $topRiskyCustomers,
            'lowRiskCustomers' => $lowRiskCustomers,
        ]);
    }
}
