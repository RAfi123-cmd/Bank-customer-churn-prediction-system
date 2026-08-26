import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex flex-col w-64 text-white
                    transition-transform duration-300 bg-slate-900
                    lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-4 border-b lg:px-6 border-slate-800">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold tracking-wide lg:text-xl">
                            Bank Churn
                        </h1>
                        <p className="text-xs text-slate-400">
                            Prediction System
                        </p>
                    </div>

                    {/* Tombol close, hanya tampil di mobile */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg lg:hidden hover:bg-slate-800"
                        aria-label="Close sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-6 overflow-y-auto lg:px-4">
                    <p className="px-3 mb-3 text-xs font-semibold tracking-wider uppercase text-slate-500">
                        Main Menu
                    </p>

                    <div className="space-y-2">
                        {/* Dashboard */}
                        <Link
                            href={route('dashboard')}
                            title="Dashboard"
                            className={`
                                flex items-center gap-3
                                rounded-lg px-3 py-3
                                text-sm font-medium
                                transition
                                ${
                                    route().current('dashboard')
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            <svg className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10h14V10" />
                            </svg>
                            <span>Dashboard</span>
                        </Link>

                        {/* Prediction */}
                        <Link
                            href={route('prediction.index')}
                            title="Prediction"
                            className={`
                                flex items-center gap-3
                                rounded-lg px-3 py-3
                                text-sm font-medium
                                transition
                                ${
                                    route().current('prediction.*')
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            <svg className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 9H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2z" />
                            </svg>
                            <span>Prediction</span>
                        </Link>

                        {/* Customers */}
                        <Link
                            href={route('customers.index')}
                            title="Customers"
                            className={`
                                flex items-center gap-3
                                rounded-lg px-3 py-3
                                text-sm font-medium
                                transition
                                ${
                                    route().current('customers.*')
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            <svg className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4a4 4 0 01-4-4v-1a4 4 0 014-4h8a4 4 0 014 4v1M9 8a4 4 0 100-8 4 4 0 000 8zm7 3a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                            <span>Customers</span>
                        </Link>
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 text-left border-t border-slate-800">
                    <p className="text-xs text-slate-500">
                        Bank Churn Prediction
                    </p>
                    <p className="text-xs text-slate-600">
                        © 2026
                    </p>
                </div>
            </aside>
        </>
    );
}