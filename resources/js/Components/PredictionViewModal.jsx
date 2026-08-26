import { useEffect } from "react";

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

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2.5 text-sm border-b border-slate-100 last:border-b-0">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value ?? "-"}</span>
        </div>
    );
}

export default function PredictionViewModal({ prediction, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!prediction) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-white shadow-xl rounded-xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Lihat Data
                        </h3>
                        <p className="text-sm text-slate-400">
                            ini hasil data yang diprediksi
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-4">
                    <DetailRow label="Nasabah" value={prediction.customer_name} />
                    <DetailRow label="Nasabah ID" value={prediction.customer_number} />
                    <div className="flex items-center justify-between p-4 mb-4 rounded-lg bg-slate-50">
                        <span className="text-2xl font-bold text-slate-800">
                            {formatProbability(prediction.churn_probability)}
                        </span>
                        <RiskBadge risk={prediction.risk_level} />
                    </div>

                    <DetailRow label="Model Version" value={prediction.model_version} />
                    <DetailRow label="Tanggal Prediksi" value={formatDate(prediction.predicted_at)} />
                </div>

                <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}