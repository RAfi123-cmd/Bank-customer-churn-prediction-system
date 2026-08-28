import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    const navItems = [
        {
            href: 'dashboard',
            current: 'dashboard',
            label: 'Dashboard',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10h14V10" />
            ),
        },
        {
            href: 'prediction.index',
            current: 'prediction.*',
            label: 'Prediction',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 9H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2z" />
            ),
        },
        {
            href: 'customers.index',
            current: 'customers.*',
            label: 'Nasabah',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4a4 4 0 01-4-4v-1a4 4 0 014-4h8a4 4 0 014 4v1M9 8a4 4 0 100-8 4 4 0 000 8zm7 3a4 4 0 100-8 4 4 0 000 8z" />
            ),
        },
    ];

    return (
        <>
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden
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
                <div className="relative flex flex-col items-center justify-center px-6 pt-8 pb-6 border-b border-slate-800/80">
                    {/* Logo Icon */}
                    <div className="flex items-center justify-center w-16 h-16 mb-3 overflow-hidden shadow-lg rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 shadow-indigo-950/40 ring-1 ring-white/10">
                        <img
                            src="/assets/img/logo PT.jpeg"
                            alt="Bank Churn Logo"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <h1 className="text-xl font-bold tracking-wide text-center text-white">
                        Bank Churn
                    </h1>
                    <p className="text-xs font-medium tracking-wide text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text">
                        Prediction System
                    </p>

                    {/* Tombol close, hanya tampil di mobile */}
                    <button
                        onClick={onClose}
                        className="absolute p-2 text-slate-400 rounded-lg right-3 top-3 lg:hidden hover:bg-slate-800 hover:text-white"
                        aria-label="Close sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 overflow-y-auto lg:px-4">
                    <p className="px-3 mb-3 text-[11px] font-semibold tracking-widest uppercase text-slate-500">
                        Main Menu
                    </p>

                    <div className="space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = route().current(item.current);
                            return (
                                <Link
                                    key={item.href}
                                    href={route(item.href)}
                                    title={item.label}
                                    className={`
                                        group flex items-center gap-3
                                        rounded-xl px-3 py-3
                                        text-sm font-medium
                                        transition-all duration-200
                                        ${
                                            isActive
                                                ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md shadow-indigo-900/30'
                                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                        }
                                    `}
                                >
                                    <svg
                                        className={`
                                            flex-shrink-0 w-5 h-5 transition-colors
                                            ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}
                                        `}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {item.icon}
                                    </svg>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 text-left border-t border-slate-800/80">
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