<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    public function index() {
        $customers = Customer::paginate(10);

        return inertia('customers/index', [
            'customers' => $customers,
        ]);
    }

    public function create(){
        return Inertia::render('customers/create');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'customer_id' => [
                'required',
                'string',
                'max:50',
                'unique:customers,customer_id'
            ],
            'full_name' => [
                'required',
                'string',
                'max:255',
            ],
            'phone' => [
                'required',
                'string',
                'max:50',
                
            ],
            'country' => [
                'required',
                'string',
                'max:100',
            ],
             'gender' => [
                'required',
                'in:Male,Female',
            ],

            'age' => [
                'required',
                'integer',
                'min:1',
                'max:120',
            ],

            'credit_score' => [
                'required',
                'integer',
                'min:0',
                'max:1000',
            ],

            'tenure' => [
                'required',
                'integer',
                'min:0',
            ],

            'balance' => [
                'required',
                'numeric',
                'min:0',
            ],

            'product_number' => [
                'required',
                'integer',
                'min:1',
            ],

            'credit_card' => [
                'boolean',
            ],

            'active_member' => [
                'boolean',
            ],

            'estimated_salary' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $validated['credit_card'] = $request->boolean('creadit_card');
        $validated['active_member'] = $request->boolean('active_member');

        $validated['created_by'] = Auth::id();

        Customer::create($validated);

        return redirect()
            ->route('customers.index')
            ->with('success', 'Nasabah berhasil ditambahkan.');
    }
    
}
