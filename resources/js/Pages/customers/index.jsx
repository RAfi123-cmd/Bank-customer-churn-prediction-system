import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value ?? 0);
}

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    const styles =
        type === "error"
            ? "bg-red-50 text-red-700 ring-red-200"
            : "bg-green-50 text-green-700 ring-green-200";

    return (
        <div
            className={`fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ring-1 ${styles}`}
        >
            {type === "error" ? (
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            )}

            <span>{message}</span>

            <button
                type="button"
                onClick={onClose}
                className="ml-2 text-current opacity-60 hover:opacity-100"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default function Index({ customers }) {
    const { props } = usePage();
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState({ message: "", type: "success" });

    useEffect(() => {
        if (props.flash?.success) {
            setToast({ message: props.flash.success, type: "success" });
        } else if (props.flash?.error) {
            setToast({ message: props.flash.error, type: "error" });
        }
    }, [props.flash]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(
            route("customers.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (customer) => {
        if (confirm(`Hapus nasabah "${customer.surname}"? Data tidak bisa dikembalikan.`)) {
            router.delete(route("customers.destroy", customer.id), {
                preserveScroll: true,
            });
        }
    };

    const rows = customers?.data ?? [];

    return (
        <AuthenticatedLayout>
            <Head title="Customers" />

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: toast.type })}
            />

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

                    {/* Customer Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                {/* Search */}
                                <div className="w-full md:w-72">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={handleSearch}
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
                                        <th className="w-12 px-6 py-4 text-left font-semibold text-slate-600">
                                            No
                                        </th>

                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Customer Id
                                        </th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-600">
                                            Name Customer
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
                                    {rows.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="9"
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
                                    ) : (
                                        rows.map((customer, index) => (
                                            <tr
                                                key={customer.id}
                                                className="border-b last:border-b-0 hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-4 text-slate-500">
                                                    {(customers.from ?? 1) + index}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {customer.customer_id}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {customer.surname}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    {customer.credit_score}
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    {formatCurrency(customer.balance)}
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    {customer.product_number}
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    {customer.country}
                                                </td>

                                                <td className="px-6 py-4 text-slate-600">
                                                    {formatCurrency(customer.estimated_salary)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={route("customers.edit", customer.id)}
                                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(customer)}
                                                            className="text-sm font-medium text-red-500 hover:text-red-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>

                        {/* Pagination */}
                        {customers?.links && rows.length > 0 && (
                            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                                <p className="text-sm text-slate-500">
                                    Menampilkan {customers.from ?? 0}–{customers.to ?? 0} dari {customers.total ?? 0} nasabah
                                </p>

                                <div className="flex gap-1">
                                    {customers.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? "#"}
                                            preserveState
                                            className={`rounded-md px-3 py-1.5 text-sm ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            } ${!link.url ? "pointer-events-none opacity-40" : ""}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}