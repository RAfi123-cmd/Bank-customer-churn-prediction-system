import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        surname: "",
        country: "",
        gender: "",
        age: "",
        credit_score: "",
        tenure: "",
        balance: "",
        product_number: "",
        credit_card: false,
        active_member: false,
        estimated_salary: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("customers.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Nasabah" />

            <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Tambah Nasabah
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Tambahkan data nasabah baru. Customer ID akan dibuat otomatis oleh sistem.
                    </p>
                </div>

                <Link
                    href={route("customers.index")}
                    className="inline-flex items-center self-start gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-auto"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 12H5m0 0l7 7m-7-7l7-7"
                        />
                    </svg>
                    Kembali
                </Link>
            </div>

            <div className="py-8">
                <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">

                    <form onSubmit={submit}>

                        <div className="mb-6 overflow-hidden bg-white shadow-sm rounded-xl ring-1 ring-slate-200">

                            <div className="px-6 py-5 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Informasi Nasabah
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Informasi dasar nasabah.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                                {/* Surname */}
                                <div>
                                    <label
                                        htmlFor="surname"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Nama Lengkap
                                    </label>

                                    <input
                                        id="surname"
                                        type="text"
                                        value={data.surname}
                                        onChange={(e) =>
                                            setData(
                                                "surname",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nama lengkap nasabah"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.surname && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.surname}
                                        </p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Country
                                    </label>

                                    <select
                                        id="country"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData(
                                                "country",
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">
                                            Pilih Country
                                        </option>
                                        <option value="France">
                                            France
                                        </option>
                                        <option value="Spain">
                                            Spain
                                        </option>
                                        <option value="Germany">
                                            Germany
                                        </option>
                                    </select>

                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.country}
                                        </p>
                                    )}
                                </div>
                                
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Gender
                                    </label>

                                    <select
                                        id="gender"
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">
                                            Pilih Gender
                                        </option>
                                        <option value="male">
                                            Male
                                        </option>
                                        <option value="female">
                                            Female
                                        </option>
                                    </select>

                                    {errors.gender && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>

                                {/* Age */}
                                <div>
                                    <label
                                        htmlFor="age"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Age
                                    </label>

                                    <input
                                        id="age"
                                        type="number"
                                        min="1"
                                        value={data.age}
                                        onChange={(e) =>
                                            setData(
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 35"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.age && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.age}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>


                        <div className="mb-6 overflow-hidden bg-white shadow-sm rounded-xl ring-1 ring-slate-200">

                            <div className="px-6 py-5 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Data Analisis
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Data yang akan digunakan untuk proses
                                    analisis Machine Learning.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                                {/* Credit Score */}
                                <div>
                                    <label
                                        htmlFor="credit_score"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Credit Score
                                    </label>

                                    <input
                                        id="credit_score"
                                        type="number"
                                        value={data.credit_score}
                                        onChange={(e) =>
                                            setData(
                                                "credit_score",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 650"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.credit_score && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.credit_score}
                                        </p>
                                    )}
                                </div>

                                {/* Tenure */}
                                <div>
                                    <label
                                        htmlFor="tenure"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Tenure
                                    </label>

                                    <input
                                        id="tenure"
                                        type="number"
                                        min="0"
                                        value={data.tenure}
                                        onChange={(e) =>
                                            setData(
                                                "tenure",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 5"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.tenure && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tenure}
                                        </p>
                                    )}
                                </div>

                                {/* Balance */}
                                <div>
                                    <label
                                        htmlFor="balance"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Balance
                                    </label>

                                    <input
                                        id="balance"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.balance}
                                        onChange={(e) =>
                                            setData(
                                                "balance",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 12500000"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.balance && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.balance}
                                        </p>
                                    )}
                                </div>

                                {/* Product Number */}
                                <div>
                                    <label
                                        htmlFor="product_number"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Jumlah Produk
                                    </label>

                                    <input
                                        id="product_number"
                                        type="number"
                                        min="1"
                                        value={data.product_number}
                                        onChange={(e) =>
                                            setData(
                                                "product_number",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 2"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.product_number && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.product_number}
                                        </p>
                                    )}
                                </div>

                                {/* Estimated Salary */}
                                <div>
                                    <label
                                        htmlFor="estimated_salary"
                                        className="block mb-2 text-sm font-medium text-slate-700"
                                    >
                                        Estimated Salary
                                    </label>

                                    <input
                                        id="estimated_salary"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.estimated_salary}
                                        onChange={(e) =>
                                            setData(
                                                "estimated_salary",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 15000000"
                                        className="w-full text-sm rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.estimated_salary && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.estimated_salary}
                                        </p>
                                    )}
                                </div>

                                {/* Credit Card */}
                                <div className="flex items-center gap-3 pt-7">
                                    <input
                                        id="credit_card"
                                        type="checkbox"
                                        checked={data.credit_card}
                                        onChange={(e) =>
                                            setData(
                                                "credit_card",
                                                e.target.checked
                                            )
                                        }
                                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                    />

                                    <label
                                        htmlFor="credit_card"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Memiliki Credit Card
                                    </label>
                                </div>

                                {/* Active Member */}
                                <div className="flex items-center gap-3 pt-7">
                                    <input
                                        id="active_member"
                                        type="checkbox"
                                        checked={data.active_member}
                                        onChange={(e) =>
                                            setData(
                                                "active_member",
                                                e.target.checked
                                            )
                                        }
                                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                    />

                                    <label
                                        htmlFor="active_member"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Active Member
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3">

                            <Link
                                href={route("customers.index")}
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Nasabah"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}