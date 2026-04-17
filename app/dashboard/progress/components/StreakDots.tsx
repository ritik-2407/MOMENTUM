"use client";

import React, { useEffect, useMemo, useState } from "react";

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

function MonthlyStreakBoxesComponent({ completedDays }: MonthlyStreakBoxesProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    setIsMounted(true);
    const setView = () => {
      if (window.innerWidth < 640) {
        setViewport("mobile");
      } else if (window.innerWidth < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    setView();
    window.addEventListener("resize", setView);
    return () => window.removeEventListener("resize", setView);
  }, []);

  // Convert completedDays into: { 0: [dates], 1: [dates], ... }
  const groupedByMonth = useMemo(() => {
    const grouped: Record<number, Set<number>> = {};
    completedDays.forEach(({ date }) => {
      const d = new Date(date);
      const month = d.getMonth();
      if (!grouped[month]) grouped[month] = new Set<number>();
      grouped[month].add(d.getDate());
    });
    return grouped;
  }, [completedDays]);

  const currentMonthIndex = new Date().getMonth();
  const mobileMonthsIndices = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => {
        let m = currentMonthIndex - 3 + i;
        if (m < 0) m += 12; // wrap around to previous year
        return m;
      }),
    [currentMonthIndex]
  );

  // Helper to render a single month card
  const renderMonthCard = (monthIndex: number, isMobile: boolean) => {
    const name = MONTHS[monthIndex];
    const daySet = groupedByMonth[monthIndex] || new Set<number>();
    const dots = Array.from({ length: 31 }, (_, i) => {
      const filled = daySet.has(i + 1);
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

  // Avoid hydration mismatch while waiting for viewport detection.
  if (!isMounted) {
    return <div className="w-full mt-2 min-h-[140px]" />;
  }

  if (viewport === "mobile") {
    return (
      <div className="w-full mt-2 grid grid-cols-2 gap-x-3 gap-y-4 justify-items-center max-w-[400px] mx-auto">
        {mobileMonthsIndices.map((i) => renderMonthCard(i, true))}
      </div>
    );
  }

  if (viewport === "tablet") {
    return (
      <div className="w-full mt-2 grid grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-4 justify-items-center">
        {MONTHS.map((_, i) => renderMonthCard(i, false))}
      </div>
    );
  }

  return (
    <div className="w-full mt-2 grid grid-cols-6 gap-x-3 gap-y-4 justify-items-center max-w-[1000px] mx-auto">
      {MONTHS.map((_, i) => renderMonthCard(i, false))}
    </div>
  );
}

const MonthlyStreakBoxes = React.memo(MonthlyStreakBoxesComponent);
export default MonthlyStreakBoxes;
