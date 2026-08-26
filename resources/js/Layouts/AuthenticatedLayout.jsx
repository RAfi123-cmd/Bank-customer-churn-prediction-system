import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import Sidebar from './Partials/Sidebar';

import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="min-h-screen lg:ml-64">
                <nav className="sticky top-0 z-30 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            {/* Tombol hamburger, hanya tampil di mobile */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100"
                                aria-label="Open sidebar"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div>
                                {header}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-slate-900">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 transition rounded-lg hover:bg-gray-100 hover:text-gray-800 focus:outline-none"
                                    >
                                        <span className="hidden sm:inline">{user.name}</span>

                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>

                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}