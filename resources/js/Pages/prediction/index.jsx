import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function RiskBadge({ risk }) {
    const config = {
        high:   { label: "Merah — Risiko Tinggi", style: "bg-red-100 text-red-700" },
        medium: { label: "Kuning — Risiko Sedang", style: "bg-yellow-100 text-yellow-700" },
        low:    { label: "Hijau — Risiko Rendah",  style: "bg-green-100 text-green-700" },
    };
    const item = config[risk];
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${item?.style ?? "bg-slate-100 text-slate-500"}`}>
            {item?.label ?? risk}
        </span>
    );
}

export default function PredictionIndex() {
    const { props } = usePage();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    const [searching, setSearching] = useState(false);
    const debounceRef = useRef(null);

    const { data, setData, post, processing } = useForm({ customer_id: "" });

    useEffect(() => {
        if (!query || selected) {
            setResults([]);
            return;
        }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                const res = await axios.get(route("prediction.search-customers"), { params: { q: query } });
                setResults(res.data);
            } finally {
                setSearching(false);
            }
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    const selectCustomer = (customer) => {
        setSelected(customer);
        setData("customer_id", customer.id);
        setQuery(customer.surname);
        setResults([]);
    };

    const clearSelection = () => {
        setSelected(null);
        setData("customer_id", "");
        setQuery("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("prediction.store"), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Prediction" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Prediksi Churn</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Cari nasabah dari data yang tersimpan, lalu jalankan prediksi.
                </p>
            </div>

            <div className="mx-auto max-w-2xl">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                    {/* Search nasabah */}
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Cari Nasabah
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                if (selected) clearSelection();
                            }}
                            placeholder="Ketik Customer ID atau nama nasabah..."
                            className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />

                        {results.length > 0 && (
                            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                                {results.map((c) => (
                                    <button
                                        type="button"
                                        key={c.id}
                                        onClick={() => selectCustomer(c)}
                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                                    >
                                        <span className="font-medium text-slate-800">{c.surname}</span>
                                        <span className="ml-2 text-slate-400">#{c.customer_id}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {searching && <p className="mt-1 text-xs text-slate-400">Mencari...</p>}
                    </div>

                    {/* Preview data nasabah terpilih */}
                    {selected && (
                        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-medium text-slate-700">Data yang akan dikirim ke model:</span>
                                <button
                                    type="button"
                                    onClick={clearSelection}
                                    className="text-xs text-indigo-600 hover:text-indigo-700"
                                >
                                    Ganti nasabah
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-slate-600">
                                <span>Credit Score: <strong>{selected.credit_score}</strong></span>
                                <span>Country: <strong>{selected.country}</strong></span>
                                <span>Gender: <strong>{selected.gender}</strong></span>
                                <span>Age: <strong>{selected.age}</strong></span>
                                <span>Tenure: <strong>{selected.tenure}</strong></span>
                                <span>Balance: <strong>{selected.balance}</strong></span>
                                <span>Products: <strong>{selected.product_number}</strong></span>
                                <span>Salary: <strong>{selected.estimated_salary}</strong></span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">
                        <button
                            type="submit"
                            disabled={!selected || processing}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {processing ? "Memproses..." : "Jalankan Prediksi"}
                        </button>
                    </form>

                    {/* Hasil */}
                    {props.prediction && (
                        <div className="mt-6 rounded-lg border border-slate-200 p-4">
                            <p className="text-sm text-slate-500">Hasil untuk {props.prediction.customer_name}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-2xl font-bold text-slate-800">
                                    {(props.prediction.churn_probability * 100).toFixed(1)}%
                                </span>
                                <RiskBadge risk={props.prediction.risk_level} />
                            </div>
                        </div>
                    )}

                    {props.flash?.error && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {props.flash.error}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}