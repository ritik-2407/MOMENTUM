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
    <div className="w-3xl max-w-full mt-7  p-3   rounded-xl border border-white/20 h-70">
        <p className="mb-20 text-center font-poppins text-xl">Completed Todos</p>
      <div style={{ width: "100%", height: "60%" }}>
        <ResponsiveContainer>
          <BarChart data={points} >
            {/* subtle grid or remove it if you want zero noise */}
            <CartesianGrid horizontal={false} vertical={false} />
            {/* X axis hidden (no ticks, no labels, no line) */}
            <XAxis dataKey="date" tick={false} axisLine={false}  />
            {/* Y axis: integer ticks only, no decimals */}
            <YAxis
            width={11}
              allowDecimals={false}
              domain={[0, dataMax + 1]}
              tickLine={false}
              axisLine={false}
            />
            {/* Simple tooltip with minimal styles */}
            <Tooltip
              wrapperStyle={{ outline: "none", background:"none" }}
              contentStyle={{ background: "#0b0b0b", border: "5", padding: 4, borderRadius: 6 }}
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: any) => [value, "Completed"]}
            />
            {/* White bars */}
            <Bar dataKey="value" fill="#ffffff" radius={[6, 6, 0, 0]} barSize={3} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
