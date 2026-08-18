import Dropdown from '@/Components/Dropdown';
import Sidebar from '@/Layouts/Partials/Sidebar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="ml-64 min-h-screen">

                {/* Top Navbar */}
                <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white">
                    <div className="flex h-20 items-center justify-between px-8">

                        {/* Page Header */}
                        <div>
                            {header}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-3">

                            {/* Avatar */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none"
                                    >
                                        {user.name}

                                        <svg
                                            className="h-4 w-4"
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

                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                    >
                                        Profile
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>

                                </Dropdown.Content>
                            </Dropdown>

                        </div>
                    </div>
                </nav>

                {/* Content */}
                <main className="p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}