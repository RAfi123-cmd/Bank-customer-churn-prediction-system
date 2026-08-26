import { useEffect, useRef } from "react";
import * as d3 from "d3";

const RISK_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
const RISK_LABELS = { high: "Merah — Tinggi", medium: "Kuning — Sedang", low: "Hijau — Rendah" };

export default function RiskDonutChart({ high, medium, low }) {
    const svgRef = useRef(null);

    useEffect(() => {
        const data = [
            { key: "high", value: high },
            { key: "medium", value: medium },
            { key: "low", value: low },
        ];
        const total = high + medium + low;
        const size = 220;
        const radius = size / 2;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .attr("viewBox", `0 0 ${size} ${size}`)
            .append("g")
            .attr("transform", `translate(${radius}, ${radius})`);

        const pie = d3.pie().value((d) => d.value).sort(null).padAngle(0.02);
        const arc = d3.arc().innerRadius(radius * 0.62).outerRadius(radius - 4).cornerRadius(4);

        g.selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("d", arc)
            .attr("fill", (d) => RISK_COLORS[d.data.key])
            .append("title")
            .text((d) => `${RISK_LABELS[d.data.key]}: ${d.data.value}`);

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.2em")
            .style("font-family", "'Space Grotesk', sans-serif")
            .style("font-size", "26px")
            .style("font-weight", "700")
            .attr("fill", "#0f172a")
            .text(total);

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .style("font-size", "11px")
            .attr("fill", "#94a3b8")
            .text("Total Nasabah");
    }, [high, medium, low]);

    return (
        <div className="flex flex-col items-center gap-6 sm:flex-row">
            <svg ref={svgRef} className="w-full max-w-[220px]" />
            <div className="w-full space-y-3 text-sm">
                {Object.entries(RISK_LABELS).map(([key, label]) => {
                    const val = key === "high" ? high : key === "medium" ? medium : low;
                    const pct = high + medium + low > 0 ? Math.round((val / (high + medium + low)) * 100) : 0;
                    return (
                        <div key={key} className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: RISK_COLORS[key] }} />
                            <span className="text-slate-600">{label}</span>
                            <span className="ml-auto font-semibold tabular-nums text-slate-800">{val}</span>
                            <span className="w-10 text-xs text-right text-slate-400">{pct}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}