// components/DailyTodoBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Point = { date: string; value: number };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DailyTodoBar({ api = "/api/todo-stats", height = 220 }: { api?: string; height?: number }) {
  const { data } = useSWR(api, fetcher, { refreshInterval: 0 });
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!data) return;
    const history = data.history || {};
    const arr: Point[] = Object.keys(history).map((d) => ({
      // keep full date internally, but we will hide x labels anyway
      date: d,
      value: Number(history[d]) || 0,
    }));
    arr.sort((a, b) => a.date.localeCompare(b.date));
    setPoints(arr);
  }, [data]);

  // while loading show a minimal placeholder
  if (!data) return <div className="p-4">Loading...</div>;

  // compute max so Y axis can be clean (dataMax + 1)
  const dataMax = points.reduce((m, p) => (p.value > m ? p.value : m), 0);

  return (
    <div className="relative w-full h-full flex flex-col justify-end bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* Title positioned at top right */}
      <div className="absolute top-6 right-6">
        <p className="font-poppins text-sm tracking-wide text-[#a8a8a8]">Completed Todos</p>
      </div>

      <div style={{ width: "100%", height: "70%" }}>
        <ResponsiveContainer>
          <BarChart data={points} >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="date" tick={false} axisLine={false}  />
            <YAxis
              width={20}
              allowDecimals={false}
              domain={[0, dataMax + 1]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#555", fontSize: 10, fontFamily: "sans-serif" }}
            />
            <Tooltip
              wrapperStyle={{ outline: "none", background:"none" }}
              contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 10px", borderRadius: 8, fontSize: 12, color: "#fff" }}
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: any) => [value, "Completed"]}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey="value" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
