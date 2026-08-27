import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showStatus, setShowStatus] = useState(!!status);

    useEffect(() => {
        if (status) {
            setShowStatus(true);
            const timer = setTimeout(() => setShowStatus(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="relative flex items-center justify-center min-h-screen px-4 py-8 overflow-hidden bg-slate-950 sm:px-6 lg:px-8">

                <div className="absolute rounded-full pointer-events-none -left-32 -top-32 h-72 w-72 bg-blue-600/30 blur-3xl sm:h-96 sm:w-96" />

                <div className="absolute rounded-full pointer-events-none -bottom-32 -right-32 h-72 w-72 bg-cyan-500/20 blur-3xl sm:h-96 sm:w-96" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl sm:h-[500px] sm:w-[500px]" />

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="pointer-events-none absolute right-[10%] top-[15%] hidden h-20 w-20 rounded-full border border-blue-400/10 sm:block" />

                <div className="pointer-events-none absolute bottom-[15%] left-[8%] hidden h-28 w-28 rounded-full border border-cyan-400/10 sm:block" />

                <div className="relative z-10 w-full max-w-md">

                    <div className="mb-6 text-center sm:mb-8">
                        <div className="flex items-center justify-center mx-auto mb-4 shadow-xl h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-blue-500/20 sm:h-16 sm:w-16">
                            <svg
                                className="text-white h-7 w-7 sm:h-8 sm:w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M4 6l8-3 8 3v2H4V6z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Bank Customer Churn
                        </h1>

                        <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                            Prediction & Management System
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.97] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-8">

                        <div className="mb-6 sm:mb-7">
                            <h2 className="text-xl font-bold text-center text-slate-800 sm:text-2xl">
                                Welcome back
                            </h2>

                            <p className="mt-1 text-xs text-center text-slate-500 sm:text-sm">
                                Sign in to access your staff account
                            </p>
                        </div>

                        {showStatus && status && (
                            <div className="flex items-center gap-2 px-4 py-3 mb-5 text-sm font-medium text-green-700 border border-green-200 shadow-sm rounded-xl bg-green-50">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-semibold text-slate-700"
                                >
                                    Email
                                </label>

                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 sm:text-sm"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 11V7a3 3 0 00-6 0v4m-2 0h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData(
                                            'remember',
                                            e.target.checked
                                        )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                />

                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-slate-600"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="w-5 h-5 mr-2 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />

                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>

                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in

                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 12h14M13 6l6 6-6 6"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-5 mt-6 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-400">
                                Authorized staff access only
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-xs text-center text-slate-500">
                        © 2026 Bank Customer Churn Prediction System
                    </p>
                </div>
            </div>
        </>
    );
}