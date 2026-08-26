const RISK_COLORS = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
};

function formatProbability(prob) {
    const pct = prob * 100;
    if (pct === 0) return "0%";
    return `${pct.toFixed(1)}%`;
}

export default function LowRiskCustomers({ customers }) {
    if (!customers || customers.length === 0) {
        return <p className="text-sm text-slate-400">Belum ada data prediksi.</p>;
    }

    const maxProb = Math.max(
        ...customers.map((c) => Number(c.churn_probability))
    );

    return (
        <div className="space-y-4">
            {customers.map((c, index) => {
                const prob = Number(c.churn_probability);
                const widthPct =
                    maxProb > 0 ? (prob / maxProb) * 100 : 0;

                return (
                    <div key={c.id}>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">
                                <span className="mr-2 text-slate-400">
                                    #{index + 1}
                                </span>
                                {c.customer_name}
                            </span>

                            <span className="font-semibold tabular-nums text-slate-800">
                                {formatProbability(prob)}
                            </span>
                        </div>

                        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
                            <div
                                className="h-2 transition-all rounded-full"
                                style={{
                                    width: `${Math.max(widthPct, 2)}%`,
                                    backgroundColor:
                                        RISK_COLORS[c.risk_level] ||
                                        RISK_COLORS.low,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
