"use client";

import React, { useEffect, useRef } from "react";
import useSWR from "swr";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

type Point = { day: string; date: string; value: number; isToday: boolean };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SNAPSHOT_KEY = "daily-todo-snapshots";

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

/** Read the frozen snapshots from localStorage */
function loadSnapshots(): Record<string, number> {
  try {
    const raw = localStorage.getItem(SNAPSHOT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Persist a snapshot for a given date key (past days only — never today) */
function freezePastDays(
  liveHistory: Record<string, number>,
  todayKey: string
): Record<string, number> {
  const snapshots = loadSnapshots();
  let changed = false;

  for (const [date, value] of Object.entries(liveHistory)) {
    // Only freeze days that are strictly in the past and not yet stored
    if (date < todayKey && !(date in snapshots)) {
      snapshots[date] = value;
      changed = true;
    }
  }

  if (changed) {
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
    } catch {
      // storage quota exceeded — silent fail
    }
  }

  return snapshots;
}

/**
 * Merge frozen snapshots with live data:
 * - Past days  → always use the frozen snapshot value
 * - Today      → always use the live value (reflects current state)
 */
function buildPoints(
  liveHistory: Record<string, number>,
  snapshots: Record<string, number>,
  todayKey: string
): Point[] {
  // Collect all date keys from both sources, take last 7
  const allDates = Array.from(
    new Set([...Object.keys(liveHistory), ...Object.keys(snapshots)])
  )
    .sort()
    .slice(-7);

  return allDates.map((dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    const isToday = dateStr === todayKey;

    const value = isToday
      ? (liveHistory[dateStr] ?? 0)        // live for today
      : (snapshots[dateStr] ?? liveHistory[dateStr] ?? 0); // frozen for past

    return {
      date: dateStr,
      day: DAY_LABELS[d.getDay()],
      value,
      isToday,
    };
  });
}

// Custom tooltip
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        color: "#fff",
      }}
    >
      <p style={{ margin: 0, color: "#888", marginBottom: 2 }}>
        {payload[0]?.payload?.date}
      </p>
      <p style={{ margin: 0 }}>
        <span style={{ color: "#fff", fontWeight: 600 }}>{payload[0]?.value}</span>
        <span style={{ color: "#666", marginLeft: 4 }}>completed</span>
      </p>
    </div>
  );
}

export default function DailyTodoGraph({
  api = "/api/todo-stats",
}: {
  api?: string;
}) {
  const { data, error } = useSWR(api, fetcher, { refreshInterval: 30_000 });
  const snapshotsRef = useRef<Record<string, number>>({});

  const isLoading = !data && !error;
  const todayKey = getTodayKey();

  // Whenever we receive fresh live data, freeze any newly completed past days
  useEffect(() => {
    if (data?.history) {
      snapshotsRef.current = freezePastDays(data.history, todayKey);
    }
  }, [data, todayKey]);

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex flex-col bg-black/20 rounded-2xl border border-white/5 p-6 min-h-[350px]">
        <p className="font-poppins text-sm tracking-wide text-[#a8a8a8] mb-4">Daily Todos</p>
        <div className="flex-1 flex items-end gap-2 pb-6 px-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm animate-pulse bg-white/5"
              style={{ height: `${20 + Math.random() * 40}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] min-h-[350px]">
        <p className="text-sm text-red-400">Failed to load stats</p>
      </div>
    );
  }

  const snapshots = snapshotsRef.current;
  const points = buildPoints(data?.history ?? {}, snapshots, todayKey);
  const dataMax = points.reduce((m, p) => (p.value > m ? p.value : m), 0);
  const yDomain: [number, number] = [0, Math.max(dataMax + 2, 5)];

  return (
    <div className="relative w-full h-full flex flex-col bg-black/20 rounded-2xl border border-white/5 p-6  min-h-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-poppins text-sm tracking-wide text-[#a8a8a8]">Daily Todos</p>
        <span className="text-xs text-[#555]">last 7 days</span>
      </div>

      {/* Big count for today */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-white">
          {points.find((p) => p.isToday)?.value ?? 0}
        </span>
        <span className="text-sm text-[#555] ml-2">today</span>
      </div>

      {/* Chart */}
      <div className="flex-1" style={{ minHeight: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={points}
            margin={{ top: 20, right: 4, left: -20, bottom: 0 }}
            barCategoryGap="30%"
          >
            <YAxis
              domain={yDomain}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#444", fontSize: 10, fontFamily: "sans-serif" }}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#555", fontSize: 11, fontFamily: "sans-serif" }}
              interval={0}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {points.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.isToday
                      ? "#ffffff"
                      : entry.value > 0
                      ? "#555"
                      : "#1f1f1f"
                  }
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                style={{ fill: "#666", fontSize: 10, fontFamily: "sans-serif" }}
                formatter={(v: any) =>
                  typeof v === "number" && v > 0 ? v : ""
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}