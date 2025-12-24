// components/LeagueTimeline.tsx
"use client";

import React, { useMemo } from "react";

interface LeagueTimelineProps {
  completedDays: number;
  className?: string;
}

const LEAGUES = [
  "Gold-fish",
  "Slowth",
  "A-dolph",
  "Foxi",
  "Wolfyy",
  "Octas",
  "Eagul",
  "OUTLIER",
];

function getLeague(completed: number) {
  if (completed < 5) return "Gold-fish";
  if (completed < 15) return "Slowth";
  if (completed < 30) return "A-dolph";
  if (completed < 60) return "Foxi";
  if (completed < 100) return "Wolfyy";
  if (completed < 150) return "Octas";
  if (completed < 250) return "Eagul";
  return "OUTLIER";
}

export default function LeagueTimeline({ completedDays, className = "" }: LeagueTimelineProps) {
 const currentLeague = useMemo(() => getLeague(completedDays), [completedDays]);
  const currentIndex = LEAGUES.indexOf(currentLeague);

  return (
    <div className={`w-full ${className}`}>
        <h1 className="font-poppins text-center">L E A G U E</h1>
      <div className="flex items-end gap-6 overflow-x-auto py-2">
        {LEAGUES.map((league, idx) => {
          const status =
            idx < currentIndex ? "past" : idx === currentIndex ? "current" : "future";

          const iconSrc = `/leagueIcons/animals/${league}.png`;

          const platformHeight = 5 + idx * 7; // smaller, subtle
          const size = status === "current" ? 40 : 34; // smaller icons now

          return (
            <div
              key={league}
              className="flex flex-col items-center min-w-[60px]"
            >
              {/* Icon */}
              <img
                src={iconSrc}
                alt={league}
                className={`
                  object-contain transition-all duration-200
                  ${status === "future" ? "opacity-30 grayscale" : "opacity-100"}
                `}
                style={{
                  width: size,
                  height: size,
                  transform: status === "current" ? "scale(1.1)" : "scale(1)",
                }}
              />

              {/* Platform */}
              <div
                className="w-1 mt-1 rounded-sm"
                style={{
                  height: platformHeight,
                  backgroundColor:
                    status === "future"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.8)",
                }}
              />

              {/* Label */}
              <div
                className={`mt-1 text-[10px] tracking-wide ${
                  status === "future" ? "text-neutral-600" : "text-neutral-200"
                }`}
              >
                {league}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
