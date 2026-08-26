import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import CustomerViewModal from "@/Components/CustomerViewModal";

const COUNTRIES = ["France", "Germany", "Spain"];
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
                <svg className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            )}

            <span>{message}</span>

            <button
                type="button"
                onClick={onClose}
                className="ml-2 text-current opacity-60 hover:opacity-100"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default function Index({ customers }) {
    const { props } = usePage();
    const [search, setSearch] = useState(props.filters?.search ?? "");
    const [country, setCountry] = useState(props.filters?.country ?? "");
    const [toast, setToast] = useState({ message: "", type: "success" });
    const [viewingCustomer, setViewingCustomer] = useState(null);

    useEffect(() => {
        if (props.flash?.success) {
            setToast({ message: props.flash.success, type: "success" });
        } else if (props.flash?.error) {
            setToast({ message: props.flash.error, type: "error" });
        }
    }, [props.flash]);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("customers.index"),
            { search: search || undefined, country: country || undefined },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch("");
        setCountry("");
        router.get(route("customers.index"), {}, { preserveState: true, replace: true });
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

            <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Nasabah
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage and monitor bank customers.
                    </p>
                </div> 
            </div>

            <div>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="flex justify-end mb-4">
                        <Link
                            href={route("customers.create")}
                            className="inline-flex items-end justify-end gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Nasabah
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm rounded-xl ring-1 ring-slate-200">
                        <div className="px-6 py-5 border-b border-slate-200">
                            <form onSubmit={handleFilter} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nasabah..."
                                    className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:w-64"
                                />

                                

                                <div className="flex items-center gap-3 sm:ml-auto">
                                    <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:w-48"
                                >
                                    <option value="">Semua Negara</option>
                                    {COUNTRIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
            <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                Cari
            </button>

            {(search || country) && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    Reset
                </button>
            )}
        </div>
                            </form>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">

                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="w-12 px-6 py-4 font-semibold text-left text-slate-600">
                                            No
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Customer Id
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Name Customer
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Credit Score
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Balance
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Produk
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Country
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
                                            Estimated Salary
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-left text-slate-600">
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

                                                    <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-slate-100">
                                                        <svg
                                                            className="w-6 h-6 text-slate-400"
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
                                                        <button
                                                            type="button"
                                                            onClick={() => setViewingCustomer(customer)}
                                                            className="text-sm font-medium text-slate-500 hover:text-slate-700"
                                                        >
                                                            Lihat
                                                        </button>

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

                        {customers?.links && rows.length > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                                <p className="text-sm text-slate-500">
                                    Menampilkan {customers.from ?? 0}–{customers.to ?? 0} dari {customers.total ?? 0}
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

            <CustomerViewModal
                customer={viewingCustomer}
                onClose={() => setViewingCustomer(null)}
            />
        </AuthenticatedLayout>
    );
}