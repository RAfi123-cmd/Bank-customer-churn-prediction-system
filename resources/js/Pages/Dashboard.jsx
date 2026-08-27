import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import StatCard from '@/Components/StatCard';
import RiskDonutChart from '@/Components/RiskDonutChart';
import RiskByCountryChart from '@/Components/RiskByCountryChart';
import TopRiskyCustomers from '@/Components/TopRiskyCustomers';
import LowRiskCustomers from '@/Components/LowRiskCustomers';

export default function Dashboard() {
    const { props } = usePage();
    const stats = props.stats ?? {
        total_customers: 0, high_risk: 0, medium_risk: 0, low_risk: 0,
        total_predicted: 0, churn_rate: 0,
    };
    const trendByCountry = props.trendByCountry ?? [];
    const topRiskyCustomers = props.topRiskyCustomers ?? [];
    const lowRiskCustomers = props.lowRiskCustomers ?? [];
    const isChurnAlert = stats.churn_rate > 10;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Ringkasan risiko churn nasabah diperbarui otomatis dari hasil prediksi model.
                </p>
            </div>
             
            <div className="relative mb-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl">
                <div className="absolute w-40 h-40 rounded-full -right-10 -top-16 bg-white/5" />
                <div className="absolute w-56 h-56 rounded-full -bottom-32 right-32 bg-indigo-500/10" />
                <div className="absolute w-32 h-32 rounded-full -left-16 -bottom-16 bg-white/5" />

                <div className="relative flex flex-col items-start justify-between gap-6 p-7 sm:p-8 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Selamat Datang {props.auth?.user?.name} 👋
                        </h1>

                        <p className="max-w-2xl mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                            Pantau kondisi nasabah dan risiko churn secara lebih mudah
                            melalui data prediksi yang tersedia di sistem.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Nasabah" value={stats.total_customers.toLocaleString('id-ID')} note="Terdaftar di sistem" href={route('customers.index')} />
                <StatCard label="Risiko Tinggi" value={stats.high_risk.toLocaleString('id-ID')} tone="red" note="Merah — perlu perhatian" href={route('prediction.index', { risk_level: 'high'})} />
                <StatCard label="Risiko Rendah" value={stats.low_risk.toLocaleString('id-ID')} tone="green" note="Hijau — nasabah stabil" href={route('prediction.index', { risk_level: 'low'})} />
                <StatCard label="Churn Rate" value={`${stats.churn_rate}%`} tone="orange" note="Dari total nasabah terprediksi" pulse={isChurnAlert} href={route('prediction.index')} />
            </div>

            <div className="grid gap-4 mt-6 lg:grid-cols-5">
                <div className="p-6 bg-white shadow-sm rounded-2xl ring-1 ring-slate-100 lg:col-span-2">
                    <h2 className="text-base font-semibold text-slate-800">Distribusi Risiko</h2>
                    <p className="mt-1 text-sm text-slate-500">Prediksi terbaru per nasabah.</p>
                    <div className="mt-6">
                        <RiskDonutChart high={stats.high_risk} medium={stats.medium_risk} low={stats.low_risk} />
                    </div>
                </div>

                <div className="p-6 bg-white shadow-sm rounded-2xl ring-1 ring-slate-100 lg:col-span-3">
                    <h2 className="text-base font-semibold text-slate-800">Distribusi Risiko per Negara</h2>
                    <p className="mt-1 text-sm text-slate-500">Berdasarkan prediksi terbaru per nasabah.</p>

                    <div className="grid gap-4 mt-6 sm:grid-cols-3">
                        <div>
                            <p className="mb-2 text-xs font-semibold text-red-600">Risiko Tinggi</p>
                            <RiskByCountryChart data={trendByCountry} dataKey="high" color="#ef4444" />
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-semibold text-amber-600">Risiko Sedang</p>
                            <RiskByCountryChart data={trendByCountry} dataKey="medium" color="#f59e0b" />
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-semibold text-emerald-600">Risiko Rendah</p>
                            <RiskByCountryChart data={trendByCountry} dataKey="low" color="#10b981" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 mt-4 lg:grid-cols-5">
                <div className="p-6 bg-white shadow-sm rounded-2xl ring-1 ring-slate-100 lg:col-span-2">
                    <h2 className="text-base font-semibold text-slate-800">Nasabah Paling Berisiko</h2>
                    <p className="mt-1 text-sm text-slate-500">Top 5 berdasarkan probabilitas churn.</p>
                    <div className="mt-6">
                        <TopRiskyCustomers customers={topRiskyCustomers} />
                    </div>
                </div>
                <div className="p-6 bg-white shadow-sm rounded-2xl ring-1 ring-slate-100 lg:col-span-3">
                    <h2 className="text-base font-semibold text-slate-800">
                        Nasabah Paling Stabil
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Top 5 dengan probabilitas churn paling rendah.
                    </p>

                    <div className="mt-6">
                        <LowRiskCustomers customers={lowRiskCustomers} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}