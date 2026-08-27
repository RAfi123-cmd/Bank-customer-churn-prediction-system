import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="relative flex items-center justify-center min-h-screen px-4 py-8 overflow-hidden bg-slate-950 sm:px-6 lg:px-8">

                {/* Blue Glow */}
                <div className="absolute rounded-full pointer-events-none -left-32 -top-32 h-72 w-72 bg-blue-600/30 blur-3xl sm:h-96 sm:w-96" />

                <div className="absolute rounded-full pointer-events-none -bottom-32 -right-32 h-72 w-72 bg-cyan-500/20 blur-3xl sm:h-96 sm:w-96" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl sm:h-[500px] sm:w-[500px]" />

                {/* Grid Pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Decorative Circles */}
                <div className="pointer-events-none absolute right-[10%] top-[15%] hidden h-20 w-20 rounded-full border border-blue-400/10 sm:block" />

                <div className="pointer-events-none absolute bottom-[15%] left-[8%] hidden h-28 w-28 rounded-full border border-cyan-400/10 sm:block" />

                <div className="relative z-10 w-full max-w-md">

                    {/* Logo */}
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
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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

                    {/* ================= CARD ================= */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.97] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-8">

                        {/* Header */}
                        <div className="mb-6 sm:mb-7">
                            <h2 className="text-xl font-bold text-center text-slate-800 sm:text-2xl">
                                Forgot password?
                            </h2>

                            <p className="mt-1 text-xs text-center text-slate-500 sm:text-sm">
                                No problem. Enter your email and we'll send you a reset link
                            </p>
                        </div>

                        {/* Status */}
                        {status && (
                            <div className="px-4 py-3 mb-5 text-sm font-medium text-green-600 border border-green-100 rounded-xl bg-green-50">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">

                            {/* Email */}
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

                            {/* Button */}
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

                                        Sending link...
                                    </>
                                ) : (
                                    <>
                                        Email Password Reset Link

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
                            <Link
                                href={route('login')}
                                className="inline-flex items-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 sm:text-sm"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to login
                            </Link>
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