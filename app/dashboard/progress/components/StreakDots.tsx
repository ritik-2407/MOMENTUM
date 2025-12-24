"use client";

import React from "react";

interface CompletedDay {
  date: string | Date;
}

interface MonthlyStreakBoxesProps {
  completedDays: CompletedDay[];
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

export default function MonthlyStreakBoxes({ completedDays }: MonthlyStreakBoxesProps) {
  // Convert completedDays into: { 0: [dates], 1: [dates], ... }
  const groupedByMonth: Record<number, Date[]> = {};

  completedDays.forEach(({ date }) => {
    const d = new Date(date);
    const month = d.getMonth();
    if (!groupedByMonth[month]) groupedByMonth[month] = [];
    groupedByMonth[month].push(d);
  });

  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {MONTHS.map((name, monthIndex) => {
        const days = groupedByMonth[monthIndex] || [];

        // Create 31-dot layout
        const dots = Array.from({ length: 31 }, (_, i) => {
          const filled = days.some(d => d.getDate() === i + 1);

          // Nice gradient per month
          const ratio = filled
            ? (i + 1) / 31
            : 0;

          const intensity = Math.floor(60 + 160 * ratio);

          return (
            <div
              key={i}
              className="w-3 h-3 rounded-sm transition-all duration-300"
              style={{
                backgroundColor: filled
                  ? `rgb(0, ${intensity}, 0)`
                  : "rgba(255,255,255,0.08)",
              }}
            />
          );
        });

        return (
          <div
            key={monthIndex}
            className="p-4 w-[150px] bg-black/20 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg"
          >
            <div className="text-center text-sm mb-2 opacity-70 tracking-widest">
              {name}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {dots}
            </div>
          </div>
        );
      })}
    </div>
  );
}
