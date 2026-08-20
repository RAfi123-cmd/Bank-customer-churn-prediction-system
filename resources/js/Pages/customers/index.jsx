import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Customers" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">
                    Nasabah
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage and monitor bank customers.
                </p>
            </div>

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Summary */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <p className="text-sm text-slate-500">
                                Total Nasabah
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                -
                            </h3>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <p className="text-sm text-slate-500">
                                High Risk
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-red-600">
                                -
                            </h3>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <p className="text-sm text-slate-500">
                                Medium Risk
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-yellow-600">
                                -
                            </h3>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <p className="text-sm text-slate-500">
                                Low Risk
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-green-600">
                                -
                            </h3>
                        </div>

                    </div>

                    {/* Customer Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                {/* Search */}
                                <div className="w-full md:w-72">
                                    <input
                                        type="text"
                                        placeholder="Cari nasabah..."
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <Link
                                    href={route("customers.create")}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Tambah Nasabah
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">

                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Credit Score
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Balance
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Produk
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Country
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Estimated Salary
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center">

                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                                    <svg
                                                        className="h-6 w-6 text-slate-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>

                                                <h3 className="font-medium text-slate-700">
                                                    Belum ada data nasabah
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    Data nasabah akan ditampilkan
                                                    di sini.
                                                </p>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>

            {/* Create Customer Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowCreateModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Tambah Nasabah
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Masukkan data nasabah baru.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Form sementara */}
                        <div className="px-6 py-6">
                            <p className="text-sm text-slate-500">
                                Form input nasabah akan dibuat di sini.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Simpan Nasabah
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
