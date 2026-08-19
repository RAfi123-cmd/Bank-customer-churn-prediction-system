<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
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
}
