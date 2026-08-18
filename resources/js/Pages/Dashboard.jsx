import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Overview of Bank Churn Prediction System
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Total Customers */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Customers
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                        1,250
                    </h3>

                    <p className="mt-2 text-xs text-gray-400">
                        Registered customers
                    </p>
                </div>

                {/* Churn Customers */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Churn Customers
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-red-600">
                        186
                    </h3>

                    <p className="mt-2 text-xs text-red-400">
                        Customers at risk
                    </p>
                </div>

                {/* Safe Customers */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Safe Customers
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-600">
                        1,064
                    </h3>

                    <p className="mt-2 text-xs text-green-500">
                        Low churn probability
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Churn Rate
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-orange-600">
                        14.88%
                    </h3>

                    <p className="mt-2 text-xs text-orange-400">
                        Overall churn rate
                    </p>
                </div>

            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
