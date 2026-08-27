import { useEffect } from "react";

function RiskBadge({ risk }) {
    const config = {
        high: {
            label: "Risiko Tinggi",
            style: "bg-red-50 text-red-600 border-red-100",
            dot: "bg-red-500",
        },
        medium: {
            label: "Risiko Sedang",
            style: "bg-amber-50 text-amber-600 border-amber-100",
            dot: "bg-amber-500",
        },
        low: {
            label: "Risiko Rendah",
            style: "bg-emerald-50 text-emerald-600 border-emerald-100",
            dot: "bg-emerald-500",
        },
    };

    const item = config[risk];

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                item?.style ?? "bg-slate-50 text-slate-500 border-slate-100"
            }`}
        >
            <span
                className={`h-2 w-2 rounded-full ${
                    item?.dot ?? "bg-slate-400"
                }`}
            />
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

    return Number.isFinite(num)
        ? `${(num * 100).toFixed(1)}%`
        : "-";
}

function getRiskColor(risk) {
    switch (risk) {
        case "high":
            return "bg-red-500";

        case "medium":
            return "bg-amber-500";

        case "low":
            return "bg-emerald-500";

        default:
            return "bg-slate-400";
    }
}

function getRiskDescription(risk) {
    switch (risk) {
        case "high":
            return "Nasabah memiliki churn yang tinggi.";

        case "medium":
            return "Nasabah memiliki churn yang sedang.";

        case "low":
            return "Nasabah memiliki churn yang rendah.";

        default:
            return "Tingkat risiko belum tersedia.";
    }
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {value ?? "-"}
                </p>
            </div>
        </div>
    );
}

export default function PredictionViewModal({
    prediction,
    onClose,
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!prediction) return null;

    const probability = Number(prediction.churn_probability);
    const percentage = Number.isFinite(probability)
        ? Math.min(Math.max(probability * 100, 0), 100)
        : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Detail Prediksi
                            </h3>

                            <p className="mt-0.5 text-sm text-slate-400">
                                Informasi hasil prediksi risiko churn
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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


                <div className="overflow-y-auto px-6 py-6">
                    <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                            <h4 className="text-sm font-bold text-slate-700">
                                Informasi Nasabah
                            </h4>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoItem
                                label="Nama Nasabah"
                                value={prediction.customer_name}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                }
                            />

                            <InfoItem
                                label="Nasabah ID"
                                value={prediction.customer_number}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />

                            <h4 className="text-sm font-bold text-slate-700">
                                Hasil Prediksi
                            </h4>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                            <div className="p-5">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                            Probabilitas Churn
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="text-4xl font-extrabold tracking-tight text-slate-800">
                                                {formatProbability(
                                                    prediction.churn_probability
                                                )}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Kemungkinan nasabah mengalami churn
                                        </p>
                                    </div>

                                    <RiskBadge
                                        risk={prediction.risk_level}
                                    />
                                </div>

                                
                                <div className="mt-6">
                                    <div className="mb-2 flex justify-between text-xs">
                                        <span className="text-slate-400">
                                            Tingkat Risiko
                                        </span>

                                        <span className="font-semibold text-slate-600">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${getRiskColor(
                                                prediction.risk_level
                                            )}`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="border-t border-slate-200/70 bg-white px-5 py-3">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M13 16h-1v-4h-1m1-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                                        />
                                    </svg>

                                    <p className="text-xs text-slate-500">
                                        {getRiskDescription(
                                            prediction.risk_level
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />

                            <h4 className="text-sm font-bold text-slate-700">
                                Informasi Model
                            </h4>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoItem
                                label="Model Version"
                                value={prediction.model_version}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                }
                            />

                            <InfoItem
                                label="Tanggal Prediksi"
                                value={formatDate(
                                    prediction.predicted_at
                                )}
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </div>

                
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                    <p className="hidden text-xs text-slate-400 sm:block">
                        Tekan <span className="font-semibold">Esc</span> untuk
                        menutup
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}