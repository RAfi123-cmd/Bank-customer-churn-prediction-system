import { useEffect } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value ?? 0);
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400">
                {label}
            </p>

            <p className="mt-1.5 text-sm font-semibold text-slate-800">
                {value ?? "-"}
            </p>
        </div>
    );
}

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                active
                    ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
        >
            <span
                className={`h-2 w-2 rounded-full ${
                    active ? "bg-emerald-500" : "bg-slate-400"
                }`}
            />

            {active ? "Aktif" : "Tidak Aktif"}
        </span>
    );
}

function CreditCardStatus({ active }) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                active
                    ? "border-blue-100 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
        >
            <span
                className={`h-2 w-2 rounded-full ${
                    active ? "bg-blue-500" : "bg-slate-400"
                }`}
            />

            {active ? "Memiliki Kartu" : "Tidak Memiliki"}
        </span>
    );
}

export default function CustomerViewModal({
    customer,
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

    if (!customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Detail Nasabah
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Informasi lengkap data nasabah
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl p-2 text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                            ×
                        </button>
                    </div>

                    {/* Identity */}
                    <div className="mt-5 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Username
                            </p>

                            <p className="mt-1 text-base font-bold text-slate-800">
                                {customer.surname || "-"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Customer ID: {customer.customer_id || "-"}
                            </p>
                        </div>

                        <StatusBadge
                            active={Boolean(customer.active_member)}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto px-6 py-6">

                    {/* Informasi Personal */}
                    <section>
                        <div className="mb-3">
                            <h4 className="text-sm font-bold text-slate-700">
                                Informasi Personal
                            </h4>

                            <div className="mt-2 h-px bg-slate-100" />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoCard
                                label="Country"
                                value={customer.country}
                            />

                            <InfoCard
                                label="Gender"
                                value={
                                    customer.gender === "male"
                                        ? "Male"
                                        : "Female"
                                }
                            />

                            <InfoCard
                                label="Age"
                                value={`${customer.age ?? "-"} tahun`}
                            />

                            <InfoCard
                                label="Tenure"
                                value={`${customer.tenure ?? "-"} tahun`}
                            />
                        </div>
                    </section>

                    {/* Informasi Finansial */}
                    <section className="mt-6">
                        <div className="mb-3">
                            <h4 className="text-sm font-bold text-slate-700">
                                Informasi Finansial
                            </h4>

                            <div className="mt-2 h-px bg-slate-100" />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoCard
                                label="Credit Score"
                                value={customer.credit_score}
                            />

                            <InfoCard
                                label="Balance"
                                value={formatCurrency(
                                    customer.balance
                                )}
                            />

                            <InfoCard
                                label="Jumlah Produk"
                                value={`${customer.product_number ?? 0} produk`}
                            />

                            <InfoCard
                                label="Estimated Salary"
                                value={formatCurrency(
                                    customer.estimated_salary
                                )}
                            />
                        </div>
                    </section>

                    {/* Status */}
                    <section className="mt-6">
                        <div className="mb-3">
                            <h4 className="text-sm font-bold text-slate-700">
                                Status Akun
                            </h4>

                            <div className="mt-2 h-px bg-slate-100" />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-slate-400">
                                        Status Nasabah
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        Keaktifan Akun
                                    </p>
                                </div>

                                <StatusBadge
                                    active={Boolean(
                                        customer.active_member
                                    )}
                                />
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-slate-400">
                                        Kartu Kredit
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        Kepemilikan
                                    </p>
                                </div>

                                <CreditCardStatus
                                    active={Boolean(
                                        customer.credit_card
                                    )}
                                />
                            </div>

                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                    <p className="hidden text-xs text-slate-400 sm:block">
                        Tekan{" "}
                        <span className="font-semibold text-slate-500">
                            Esc
                        </span>{" "}
                        untuk menutup
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}