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

  const currentMonthIndex = new Date().getMonth();

  // Create an array for the last 4 months (for mobile view)
  const mobileMonthsIndices = Array.from({ length: 4 }, (_, i) => {
    let m = currentMonthIndex - 3 + i;
    if (m < 0) m += 12; // wrap around to previous year
    return m;
  });

  // Helper to render a single month card
  const renderMonthCard = (monthIndex: number, isMobile: boolean) => {
    const name = MONTHS[monthIndex];
    const days = groupedByMonth[monthIndex] || [];
    const dots = Array.from({ length: 31 }, (_, i) => {
      const filled = days.some(d => d.getDate() === i + 1);
      const ratio = filled ? (i + 1) / 31 : 0;
      const intensity = Math.floor(100 + 155 * ratio);

      return (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-[2px] transition-all duration-300"
          style={{
            backgroundColor: filled ? `rgb(0, ${intensity}, 0)` : "rgba(255,255,255,0.04)",
            boxShadow: filled ? `0 0 4px rgba(0, ${intensity}, 0, 0.4)` : "none"
          }}
        />
      );
    });

    return (
      <div
        key={`${isMobile ? 'm' : 'd'}-${monthIndex}`}
        className="p-4 w-full max-w-[140px] bg-[#0a0a0a] rounded-[14px] border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02] duration-300 mx-auto"
      >
        <div className="text-center text-[13px] mb-3 text-[#a8a8a8] tracking-[0.2em] font-medium">
          {name}
        </div>
        <div className="grid grid-cols-7 gap-[3.5px] place-items-center">
          {dots}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-2 flex flex-col items-center">
      {/* --- DESKTOP VIEW (All 12 months, 6 cols max) --- */}
      <div className="hidden lg:grid grid-cols-6 gap-x-3 gap-y-4 w-full justify-items-center max-w-[1000px]">
        {MONTHS.map((_, i) => renderMonthCard(i, false))}
      </div>

      {/* --- TABLET VIEW (All 12 months, 4 cols max) --- */}
      <div className="hidden sm:grid lg:hidden grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-4 w-full justify-items-center">
        {MONTHS.map((_, i) => renderMonthCard(i, false))}
      </div>

      {/* --- MOBILE VIEW (Last 4 months, 2 cols max) --- */}
      <div className="grid sm:hidden grid-cols-2 gap-x-3 gap-y-4 w-full justify-items-center max-w-[400px]">
        {mobileMonthsIndices.map((i) => renderMonthCard(i, true))}
      </div>
    </div>
  );
}
