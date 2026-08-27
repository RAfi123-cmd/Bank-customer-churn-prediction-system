<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Prediction;
use App\Services\ChurnPredictionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PredictionController extends Controller
{
    //
    public function __construct(protected ChurnPredictionService $churnService) {}
    public function index(Request $request){
        $search = $request->query('q');
        $riskLevel = $request->query('risk_level');
        $predictionsQuery = Prediction::query()->with(['customer', 'requestedBy'])
            ->when($search, function($query,$search) {
                $query->whereHas('customer', function($q) use ($search) {
                    $q->where('surname', 'like' ,"%{$search}%")
                        ->orWhere('customer_id', 'like', "%{$search}%")
                        ->orWhere('churn_probability', 'like', "%{$search}%");
                });
            })
           ->when($riskLevel, fn($query, $riskLevel) => $query->where('risk_level', $riskLevel))
           ->latest('predicted_at');
        $predictions = $predictionsQuery
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Prediction $p) => [
                'id' => $p->id,
                'customer_name' => $p->customer?->surname ?? 'Nasabah tidak ditemukan',
                'customer_number' => $p->customer?->customer_id,
                'churn_probability' => $p->churn_probability,
                'risk_level' => $p->risk_level,
                'model_version' => $p->model_version,
                'requested_by_name' => $p->requestedBy?->name,
                'predicted_at' => $p->predicted_at,
            ]);
        return Inertia::render('prediction/index', [
            'predictions' => $predictions,
        ]);
    }
}
