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
    public function index(){
        return Inertia::render('prediction/index');
    }

    public function searchCustomers(Request $request){
        $query = $request->input('q', '');

        $customers = Customer::query()->when($query, fn ($q) => $q->where('customer_id', 'like', "%{$query}%")
                ->orWhere('surname', 'like', "%{$query}%"))
                ->limit(20)
                ->get([
                    'id', 'customer_id', 'surname', 'credit_score', 'country',
                    'gender', 'age', 'tenure', 'balance', 'product_number',
                    'credit_card', 'active_member', 'estimated_salary',
                ]);
        return response()->json($customers);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'customer_id' => ['required', 'exists:customers,id']
        ]);

        $customer = Customer::findOrFail($validated['customer_id']);

        try {
            $result = $this->churnService->predict($customer);

            $prediction = Prediction::create([
                'customer_id'       => $customer->id,
                'churn_probability' => $result['churn_probability'],
                'risk_level'        => Prediction::riskLevelFromProbability($result['churn_probability']),
                'model_version'     => $result['model_version'] ?? null,
                'raw_response'      => $result,
                'requested_by'      => Auth::id(),
                'predicted_at'      => now(),
            ]);

            return back()->with('prediction', [
                'customer_name'     => $customer->surname,
                'churn_probability' => $prediction->churn_probability,
                'risk_level'        => $prediction->risk_level,
                'predicted_at'      => $prediction->predicted_at,
            ])->with('success', 'Prediksi berhasil dijalankan.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
