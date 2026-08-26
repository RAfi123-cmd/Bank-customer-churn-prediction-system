import { Link } from '@inertiajs/react';

export default function StatCard({ label, value, tone = "slate", note, pulse = false, href }) {
    const toneStyles = {
        slate: { value: "text-slate-900" },
        red: { value: "text-red-600" },
        green: { value: "text-emerald-600" },
        orange: { value: "text-orange-600" },
    }[tone];

    const content = (
        <>
            {pulse && (
                <span className="absolute w-24 h-24 rounded-full -right-6 -top-6 bg-orange-400/20 motion-safe:animate-ping motion-reduce:hidden" />
            )}
            <p className="relative text-sm font-medium text-slate-500">{label}</p>
            <h3
                className={`relative mt-3 text-3xl font-bold tabular-nums ${toneStyles.value}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
                {value}
            </h3>
            {note && <p className="relative mt-2 text-xs text-slate-400">{note}</p>}
        </>
    );

    const baseClass = "relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md";

    if (href) {
        return (
            <Link href={href} className={`block ${baseClass} hover:ring-slate-200`}>
                {content}
            </Link>
        );
    }

    return <div className={baseClass}>{content}</div>;
}