import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function RiskByCountryChart({ data, dataKey, color }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const width = 320;
        const height = 200;
        const margin = { top: 10, right: 10, bottom: 30, left: 36 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scaleBand()
            .domain(data.map((d) => d.country))
            .range([0, innerWidth])
            .padding(0.35);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d[dataKey]) || 1])
            .nice()
            .range([innerHeight, 0]);

        const g = svg.attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
            .attr("fill", "#64748b");

        g.append("g")
            .call(d3.axisLeft(y).ticks(4))
            .call((g) => g.select(".domain").remove())
            .selectAll("text")
            .style("font-size", "11px")
            .attr("fill", "#64748b");

        g.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.country))
            .attr("y", (d) => y(d[dataKey]))
            .attr("height", (d) => innerHeight - y(d[dataKey]))
            .attr("width", x.bandwidth())
            .attr("rx", 3)
            .attr("fill", color)
            .append("title")
            .text((d) => `${d.country}: ${d[dataKey]} nasabah`);
    }, [data, dataKey, color]);

    if (!data || data.length === 0) {
        return (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200">
                <p className="text-sm text-slate-400">Belum ada data.</p>
            </div>
        );
    }

    return <svg ref={svgRef} className="w-full" style={{ height: 200 }} />;
}