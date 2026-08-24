import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

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

function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatProbability(value) {
    const num = Number(value);
    return Number.isFinite(num) ? `${(num * 100).toFixed(1)}%` : "-";
}

export default function PredictionIndex() {
    const { props } = usePage();

    const predictions = props.predictions?.data ?? [];
    const links = props.predictions?.links ?? [];
    const currentPage = props.predictions?. current_page ?? 1;
    const perPage = props.predictions?.per_page ?? 15;

    const [search, setSearch] = useState(props.filters?.q ?? "");
    const [riskLevel, setRiskLevel] = useState(props.filters?.risk_level ?? "");
    const debounceRef = useRef(null);
    const isFirstRun = useRef(true);

    // Debounce search + filter, kirim ke server via Inertia (bukan axios manual)
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            router.get(
                route("prediction.index"),
                { q: search || undefined, risk_level: riskLevel || undefined },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [search, riskLevel]);

    const clearFilters = () => {
        setSearch("");
        setRiskLevel("");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Prediction" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Prediksi Churn</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Daftar hasil prediksi churn yang sudah dibuat oleh model data science.
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">Riwayat Prediksi</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Daftar hasil prediksi yang sudah pernah dijalankan oleh model.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama atau ID nasabah..."
                                className="w-56 rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />

                            <select
                                value={riskLevel}
                                onChange={(e) => setRiskLevel(e.target.value)}
                                className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Risiko</option>
                                <option value="high">Merah — Risiko Tinggi</option>
                                <option value="medium">Kuning — Risiko Sedang</option>
                                <option value="low">Hijau — Risiko Rendah</option>
                            </select>

                            {(search || riskLevel) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                    Reset filter
                                </button>
                            )}
                        </div>
                    </div>

                    {predictions.length === 0 ? (
                        <p className="mt-4 text-sm text-slate-400">
                            {search || riskLevel
                                ? "Tidak ada hasil yang cocok dengan pencarian/filter."
                                : "Belum ada data prediksi."}
                        </p>
                    ) : (
                        <>
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 text-sm">
                                    <thead>
                                        <tr className="text-left text-slate-500">
                                            <th className="py-2 pr-4 font-medium">No</th>
                                            <th className="py-2 pr-4 font-medium">Nasabah</th>
                                            <th className="py-2 pr-4 font-medium">Id</th>
                                            <th className="py-2 pr-4 font-medium">Probabilitas Churn</th>
                                            <th className="py-2 pr-4 font-medium">Risiko</th>
                                            <th className="py-2 pr-4 font-medium">Model</th>
                                            <th className="py-2 pr-4 font-medium">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {predictions.map((p, index) => (
                                            <tr key={p.id}>
                                                <td className="py-2 pr-4 text-slate-400">
                                                    { (currentPage - 1) * perPage + index + 1 } 
                                                </td>
                                                <td className="py-2 pr-4">
                                                    <span className="font-medium text-slate-800">{p.customer_name}</span>
                                                </td>
                                                <td className="py-2 pr-4">
                                                    {p.customer_number}
                                                </td>
                                                <td className="py-2 pr-4 font-semibold text-slate-700">
                                                    {formatProbability(p.churn_probability)}
                                                </td>
                                                <td className="py-2 pr-4">
                                                    <RiskBadge risk={p.risk_level} />
                                                </td>
                                                <td className="py-2 pr-4 text-slate-500">
                                                    {p.model_version ?? "-"}
                                                </td>
                                                <td className="py-2 pr-4 text-slate-500">
                                                    {formatDate(p.predicted_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {links.length > 3 && (
                                <div className="mt-6 flex flex-wrap items-end justify-end gap-1">
                                    {links.map((link, index) => {
                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="rounded-md px-3 py-1.5 text-sm text-slate-300"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                preserveScroll
                                                preserveState
                                                className={`rounded-md px-3 py-1.5 text-sm ${
                                                    link.active
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}