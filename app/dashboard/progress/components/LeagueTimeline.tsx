// components/LeagueTimeline.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";

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

function LeagueTimelineComponent({ completedDays, className = "" }: LeagueTimelineProps) {
 const currentLeague = useMemo(() => getLeague(completedDays), [completedDays]);
  const currentIndex = LEAGUES.indexOf(currentLeague);

  return (
    <div className={`w-full flex flex-col pt-2 ${className}`}>
      <h2 className="font-poppins text-sm font-semibold tracking-[0.6em] text-center text-white/70 mb-4 uppercase">
        LEAGUE
      </h2>
      
      <div className="flex items-end justify-between overflow-x-auto pb-4 px-2 no-scrollbar">
        {LEAGUES.map((league, idx) => {
          const status =
            idx < currentIndex ? "past" : idx === currentIndex ? "current" : "future";

          const iconSrc = `/leagueIcons/animals/${league}.WebP`;

          // Taller platforms for higher leagues, but visually distinct
          const platformHeight = 12 + idx * 4; 
          const size = status === "current" ? 44 : 36; 

          return (
            <div
              key={league}
              className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]"
            >
              {/* Icon */}
              <div 
                className={`
                  relative transition-all duration-300
                  ${status === "future" ? "opacity-30 grayscale" : "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"}
                  ${status === "current" ? "scale-110" : "scale-100"}
                  mb-2
                `}
                style={{
                  width: size,
                  height: size,
                }}
              >
                <Image
                  src={iconSrc}
                  alt={league}
                  fill
                  sizes={`${size}px`}
                  loading={status === "current" ? "eager" : "lazy"}
                  priority={status === "current"}
                  className="object-contain"
                />
              </div>

              {/* Platform Stick */}
              <div
                className="w-[2px] rounded-t-sm"
                style={{
                  height: platformHeight,
                  backgroundColor:
                    status === "future"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.8)",
                  boxShadow: status === "current" ? "0 0 8px rgba(255,255,255,0.4)" : "none",
                }}
              />

              {/* Label */}
              <div
                className={`mt-2 text-[9px] sm:text-[10px] tracking-widest uppercase font-medium ${
                  status === "future" ? "text-[#555]" : "text-[#eaeaea]"
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

const LeagueTimeline = React.memo(LeagueTimelineComponent);
export default LeagueTimeline;
