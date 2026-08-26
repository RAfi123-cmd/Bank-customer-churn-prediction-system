import { useEffect, useRef } from "react";
import * as d3 from "d3";

function formatMonth(monthStr) {
    const [year, month] = monthStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
}

export default function ChurnRateLineChart({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const width = 640;
        const height = 220;
        const margin = { top: 16, right: 16, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scalePoint().domain(data.map((d) => d.month)).range([0, innerWidth]).padding(0.5);
        const maxRate = d3.max(data, (d) => d.rate) || 1;
        const y = d3.scaleLinear().domain([0, Math.max(maxRate * 1.2, 10)]).nice().range([innerHeight, 0]);

        const g = svg.attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Grid halus
        g.append("g")
            .call(d3.axisLeft(y).ticks(4).tickSize(-innerWidth).tickFormat(""))
            .call((g) => g.select(".domain").remove())
            .selectAll("line")
            .attr("stroke", "#f1f5f9");

        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x).tickSize(0))
            .call((g) => g.select(".domain").attr("stroke", "#e2e8f0"))
            .selectAll("text")
            .style("font-size", "11px")
            .attr("fill", "#64748b")
            .text((d) => formatMonth(d));

        g.append("g")
            .call(d3.axisLeft(y).ticks(4).tickFormat((d) => `${d}%`))
            .call((g) => g.select(".domain").remove())
            .selectAll("text")
            .style("font-size", "11px")
            .attr("fill", "#64748b");

        // Area gradient di bawah garis
        const gradientId = "churn-rate-gradient";
        svg.append("defs")
            .append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "0%").attr("y2", "100%")
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#fb923c", opacity: 0.25 },
                { offset: "100%", color: "#fb923c", opacity: 0 },
            ])
            .enter()
            .append("stop")
            .attr("offset", (d) => d.offset)
            .attr("stop-color", (d) => d.color)
            .attr("stop-opacity", (d) => d.opacity);

        const area = d3.area()
            .x((d) => x(d.month))
            .y0(innerHeight)
            .y1((d) => y(d.rate))
            .curve(d3.curveMonotoneX);

        g.append("path").datum(data).attr("d", area).attr("fill", `url(#${gradientId})`);

        const line = d3.line()
            .x((d) => x(d.month))
            .y((d) => y(d.rate))
            .curve(d3.curveMonotoneX);

        g.append("path")
            .datum(data)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#f97316")
            .attr("stroke-width", 2.5);

        g.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d) => x(d.month))
            .attr("cy", (d) => y(d.rate))
            .attr("r", 4)
            .attr("fill", "#f97316")
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .append("title")
            .text((d) => `${formatMonth(d.month)}: ${d.rate}%`);
    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="flex h-[220px] items-center justify-center rounded-lg border border-dashed border-slate-200">
                <p className="text-sm text-slate-400">Belum ada data untuk ditampilkan.</p>
            </div>
        );
    }

    return <svg ref={svgRef} className="w-full" style={{ height: 220 }} />;
}