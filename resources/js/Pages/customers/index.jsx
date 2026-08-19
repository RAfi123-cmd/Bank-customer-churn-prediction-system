import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function index({customers}){
    return (
        <AuthenticatedLayout>
            <Head title="Customers"/>
            <div className="mb-8">
            `    <h1 className="text-2xl font-bold text-slate-800">
                    Customers
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage and monitor bank customers.
                </p>
            </div>
        </AuthenticatedLayout>
    )
}