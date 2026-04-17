"use client";

import Image from "next/image";
import React from "react";

interface BadgeCardProps {
  completedDays: number;
  className?: string;
}

const BADGE_MILESTONES = [
  5,10,20,30,50,75,100,250
];

function BadgeCardComponent({ completedDays, className = "" }: BadgeCardProps) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      
      {/* Dashed Line Separator sitting exactly where the league platforms end */}
      <div className="w-[96%] mx-auto border-t-[1.5px] border-dashed border-white/10 mb-6"></div>

      <div className="flex justify-between items-center w-full px-2">
        {BADGE_MILESTONES.map((milestone) => {
          const unlocked = completedDays >= milestone;

          return (
            <div
              key={milestone}
              className="flex flex-col items-center w-[50px] sm:w-[60px]"
            >
              <Image
                src={`/badges/animals/${milestone}.png`}
                alt={`${milestone} day badge`}
                width={36}
                height={36}
                loading="lazy"
                className={`
                  object-contain transition-all duration-300
                  ${unlocked ? "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] hover:scale-110" : "opacity-20 grayscale brightness-75"}
                `}
              />
              <p className={`
                  mt-2 text-[11px] transition-all duration-200
                  ${unlocked ? "font-poppins font-medium text-white/90" : "font-poppins text-white/20"}
                `}>
                {milestone}
              </p>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 font-poppins text-sm text-center font-semibold text-white/70 uppercase tracking-[0.8em]">
        BADGES
      </h2>
    </div>
  );
}

const BadgeCard = React.memo(BadgeCardComponent);
export default BadgeCard;
