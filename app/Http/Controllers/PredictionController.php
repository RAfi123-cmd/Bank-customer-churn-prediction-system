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
                        ->orWhere('customer_id', 'like', "%{$search}%");
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

    // public function searchCustomers(Request $request){
    //     $query = $request->input('q', '');

    //     $customers = Customer::query()->when($query, fn ($q) => $q->where('customer_id', 'like', "%{$query}%")
    //             ->orWhere('surname', 'like', "%{$query}%"))
    //             ->limit(20)
    //             ->get([
    //                 'id', 'customer_id', 'surname', 'credit_score', 'country',
    //                 'gender', 'age', 'tenure', 'balance', 'product_number',
    //                 'credit_card', 'active_member', 'estimated_salary',
    //             ]);
    //     return response()->json($customers);
    // }

    // public function store(Request $request){
    //     $validated = $request->validate([
    //         'customer_id' => ['required', 'exists:customers,id']
    //     ]);

    //     $customer = Customer::findOrFail($validated['customer_id']);

    //     try {
    //         $result = $this->churnService->predict($customer);

    //         $prediction = Prediction::create([
    //             'customer_id'       => $customer->id,
    //             'churn_probability' => $result['churn_probability'],
    //             'risk_level'        => Prediction::riskLevelFromProbability($result['churn_probability']),
    //             'model_version'     => $result['model_version'] ?? null,
    //             'raw_response'      => $result,
    //             'requested_by'      => Auth::id(),
    //             'predicted_at'      => now(),
    //         ]);

    //         return redirect()->route('prediction.index', ['customer_id' => $customer->id])
    //             ->with('prediction', [
    //                 'customer_name'     => $customer->surname,
    //                 'churn_probability' => $prediction->churn_probability,
    //                 'risk_level'        => $prediction->risk_level,
    //                 'predicted_at'      => $prediction->predicted_at,
    //             ])
    //             ->with('success', 'Prediksi berhasil dijalankan.');
    //     } catch (\Exception $e) {
    //         return back()->with('error', $e->getMessage());
    //     }
    // }
}
