import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-white">

            {/* Logo / Brand */}
            <div className="flex h-20 items-center border-b border-slate-800 px-6">
                <div>
                    <h1 className="text-xl font-bold tracking-wide">
                        Bank Churn
                    </h1>

                    <p className="text-xs text-slate-400">
                        Prediction System
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">

                {/* Main Menu */}
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Main Menu
                </p>

                <div className="space-y-1">

                    {/* Dashboard */}
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                            route().current('dashboard')
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
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
                                d="M3 12l9-9 9 9M5 10v10h14V10"
                            />
                        </svg>

                        <span>Dashboard</span>
                    </Link>

                    {/* Prediction */}
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                                d="M9 17v-2m3 2v-4m3 4v-6m2 9H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2z"
                            />
                        </svg>

                        <span>Prediction</span>
                    </Link>

                    {/* Customers */}
                    <Link
                        href={route('customers.index')}
                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                            route().current('customers.*')
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
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
                                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4a4 4 0 01-4-4v-1a4 4 0 014-4h8a4 4 0 014 4v1M9 8a4 4 0 100-8 4 4 0 000 8zm7 3a4 4 0 100-8 4 4 0 000 8z"
                            />
                        </svg>

                        <span>Customers</span>
                    </Link>

                    {/* History */}
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                                d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>Prediction History</span>
                    </Link>
                </div>

                <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Analytics
                </p>

                <div className="space-y-1">

                    {/* Reports */}
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                                d="M9 17v-2m3 2v-4m3 4v-6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>

                        <span>Churn Analytics</span>
                    </Link>
                </div>     
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-slate-800 p-4">
                <p className="text-xs text-slate-500">
                    Bank Churn Prediction
                </p>

                <p className="mt-1 text-xs text-slate-600">
                    © 2026
                </p>
            </div>
        </aside>
    );
}