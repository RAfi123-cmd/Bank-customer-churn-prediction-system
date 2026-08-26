import { useEffect } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value ?? 0);
}

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 py-2.5 text-sm last:border-b-0">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value ?? "-"}</span>
        </div>
    );
}

export default function CustomerViewModal({ customer, onClose }) {
    // Tutup modal dengan tombol Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white shadow-xl rounded-xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Lihat Data Nasabah
                        </h3>
                        <p className="text-sm text-slate-400">
                            Hasil Data Nasabah yang diperoleh
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

                <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                    <DetailRow label="Username" value={customer.surname} />
                    <DetailRow label="ID" value={customer.customer_id} />
                    <DetailRow label="Country" value={customer.country} />
                    <DetailRow label="Gender" value={customer.gender === "male" ? "Male" : "Female"} />
                    <DetailRow label="Age" value={customer.age} />
                    <DetailRow label="Credit Score" value={customer.credit_score} />
                    <DetailRow label="Tenure" value={`${customer.tenure} tahun`} />
                    <DetailRow label="Balance" value={formatCurrency(customer.balance)} />
                    <DetailRow label="Jumlah Produk" value={customer.product_number} />
                    <DetailRow label="Estimated Salary" value={formatCurrency(customer.estimated_salary)} />
                    <DetailRow label="Punya Kartu Kredit" value={customer.credit_card ? "Ya" : "Tidak"} />
                    <DetailRow label="Nasabah Aktif" value={customer.active_member ? "Ya" : "Tidak"} />
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