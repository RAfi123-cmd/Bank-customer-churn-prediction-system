<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Prediction;
use App\Services\ChurnPredictionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //

    public function index(Request $request)
    {
        $search = $request->input('search');

        $customers = Customer::query()
            ->when($search, fn ($q) => $q->where('surname', 'like', "%{$search}%")
                ->orWhere('customer_id', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return inertia('customers/index', [
            'customers' => $customers,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('customers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'surname'          => ['required', 'string', 'max:255'],
            'country'          => ['required', 'string', 'max:100'],
            'gender'           => ['required', 'in:male,female'],
            'age'              => ['required', 'integer', 'min:1', 'max:120'],
            'credit_score'     => ['required', 'integer', 'min:0', 'max:1000'],
            'tenure'           => ['required', 'integer', 'min:0'],
            'balance'          => ['required', 'numeric', 'min:0'],
            'product_number'   => ['required', 'integer', 'min:1'],
            'credit_card'      => ['boolean'],
            'active_member'    => ['boolean'],
            'estimated_salary' => ['required', 'numeric', 'min:0'],
        ]);

        $validated['customer_id'] = $this->generateCustomerId();
        $validated['credit_card']   = $request->boolean('credit_card');
        $validated['active_member'] = $request->boolean('active_member');
        $validated['created_by']    = Auth::id();

        Customer::create($validated);

        return redirect()->route('customers.index')->with('success', 'Nasabah berhasil ditambahkan.');
    }

    private function generateCustomerId(): string
    {
        do {
            $id = (string) random_int(15000000, 15999999);
        } while (Customer::where('customer_id', $id)->exists());

        return $id;
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('customers/edit', ['customer' => $customer]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'surname'          => ['required', 'string', 'max:255'],
            'country'          => ['required', 'string', 'max:100'],
            'gender'           => ['required', 'in:male,female'],
            'age'              => ['required', 'integer', 'min:1', 'max:120'],
            'credit_score'     => ['required', 'integer', 'min:0', 'max:1000'],
            'tenure'           => ['required', 'integer', 'min:0'],
            'balance'          => ['required', 'numeric', 'min:0'],
            'product_number'   => ['required', 'integer', 'min:1'],
            'credit_card'      => ['boolean'],
            'active_member'    => ['boolean'],
            'estimated_salary' => ['required', 'numeric', 'min:0'],
        ]);

        $validated['credit_card']   = $request->boolean('credit_card');
        $validated['active_member'] = $request->boolean('active_member');
        $validated['updated_by']    = Auth::id();

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Data nasabah berhasil diperbarui.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Nasabah berhasil dihapus.');
    }
}
