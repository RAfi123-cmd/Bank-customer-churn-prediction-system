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

        $topRiskyRounded = (clone $latestPredictionsQuery)
            ->selectRaw('ROUND(predictions.churn_probability::numeric, 3) as rounded_prob')
            ->distinct()
            ->orderByDesc('rounded_prob')
            ->limit(5)
            ->pluck('rounded_prob');

        $topRiskyCustomers = $topRiskyRounded->map(function ($roundedProb) use ($latestPredictionsQuery) {
            $p = (clone $latestPredictionsQuery)
                ->with('customer')
                ->whereRaw('ROUND(predictions.churn_probability::numeric, 3) = ?', [$roundedProb])
                ->orderByDesc('predictions.churn_probability')
                ->first();

            return [
                'id' => $p->id,
                'customer_name' => $p->customer?->surname ?? 'Nasabah tidak ditemukan',
                'customer_number' => $p->customer?->customer_id,
                'churn_probability' => $p->churn_probability,
                'risk_level' => $p->risk_level,
            ];
        })->values();

        $topSafeRounded = (clone $latestPredictionsQuery)
            ->selectRaw('ROUND(predictions.churn_probability::numeric, 3) as rounded_prob')
            ->where('predictions.churn_probability', '>', 0)
            ->distinct()
            ->orderBy('rounded_prob')
            ->limit(5)
            ->pluck('rounded_prob');

        $lowRiskCustomers = $topSafeRounded->map(function ($roundedProb) use ($latestPredictionsQuery) {
            $p = (clone $latestPredictionsQuery)
                ->with('customer')
                ->whereRaw('ROUND(predictions.churn_probability::numeric, 3) = ?', [$roundedProb])
                ->orderBy('predictions.churn_probability')
                ->first();

            return [
                'id' => $p->id,
                'customer_name' => $p->customer?->surname ?? 'Nasabah tidak ditemukan',
                'customer_number' => $p->customer?->customer_id,
                'churn_probability' => $p->churn_probability,
                'risk_level' => $p->risk_level,
            ];
        })->values();
            
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
