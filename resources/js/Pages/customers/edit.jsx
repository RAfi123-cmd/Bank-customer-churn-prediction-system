import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ customer }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: customer.customer_id ?? "",
        surname: customer.surname ?? "",
        country: customer.country ?? "",
        gender: customer.gender ?? "",
        age: customer.age ?? "",
        credit_score: customer.credit_score ?? "",
        tenure: customer.tenure ?? "",
        balance: customer.balance ?? "",
        product_number: customer.product_number ?? "",
        credit_card: Boolean(customer.credit_card),
        active_member: Boolean(customer.active_member),
        estimated_salary: customer.estimated_salary ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("customers.update", customer.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Nasabah" />
             <div className="mb-8">
                        <Link
                            href={route("customers.index")}
                            className="mb-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            ← Kembali ke Nasabah
                        </Link>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Edit Nasabah
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Perbarui informasi dan data analisis nasabah.
                        </p>
                    </div>

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                   

                    <form onSubmit={submit}>

                        {/* Informasi Nasabah */}
                        <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                            <div className="border-b border-slate-200 px-6 py-5">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Informasi Nasabah
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Informasi dasar nasabah.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                                {/* Full Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        value={data.surname}
                                        onChange={(e) =>
                                            setData(
                                                "surname",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.surname && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.surname}
                                        </p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Country
                                    </label>

                                    <select
                                        value={data.country}
                                        onChange={(e) =>
                                            setData(
                                                "country",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
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

                                {/* Gender */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Gender
                                    </label>

                                    <select
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        value={data.age}
                                        onChange={(e) =>
                                            setData(
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.age && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.age}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Data Analisis */}
                        <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                            <div className="border-b border-slate-200 px-6 py-5">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Data Analisis
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Data yang digunakan untuk analisis
                                    Machine Learning.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                                {/* Credit Score */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Credit Score
                                    </label>

                                    <input
                                        type="number"
                                        value={data.credit_score}
                                        onChange={(e) =>
                                            setData(
                                                "credit_score",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.credit_score && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.credit_score}
                                        </p>
                                    )}
                                </div>

                                {/* Tenure */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Tenure
                                    </label>

                                    <input
                                        type="number"
                                        value={data.tenure}
                                        onChange={(e) =>
                                            setData(
                                                "tenure",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.tenure && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tenure}
                                        </p>
                                    )}
                                </div>

                                {/* Balance */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Balance
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.balance}
                                        onChange={(e) =>
                                            setData(
                                                "balance",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.balance && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.balance}
                                        </p>
                                    )}
                                </div>

                                {/* Product Number */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Jumlah Produk
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={data.product_number}
                                        onChange={(e) =>
                                            setData(
                                                "product_number",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.product_number && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.product_number}
                                        </p>
                                    )}
                                </div>

                                {/* Estimated Salary */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Estimated Salary
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.estimated_salary}
                                        onChange={(e) =>
                                            setData(
                                                "estimated_salary",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                        type="checkbox"
                                        checked={data.credit_card}
                                        onChange={(e) =>
                                            setData(
                                                "credit_card",
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />

                                    <label className="text-sm font-medium text-slate-700">
                                        Memiliki Credit Card
                                    </label>
                                </div>

                                {/* Active Member */}
                                <div className="flex items-center gap-3 pt-7">
                                    <input
                                        type="checkbox"
                                        checked={data.active_member}
                                        onChange={(e) =>
                                            setData(
                                                "active_member",
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />

                                    <label className="text-sm font-medium text-slate-700">
                                        Active Member
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">

                            <Link
                                href={route("customers.index")}
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
