"use client";
import { useMemo } from "react";

type Todo = {
  status: boolean;
};

interface ProgressCircleProps {
  todos: Todo[];
  size?: number; // px
  strokeWidth?: number;
}

export default function ProgressCircle({
  todos,
  size = 140,
  strokeWidth = 6,
}: ProgressCircleProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.status === true).length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  // circle math
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center
                 rounded-full backdrop-blur-md bg-[#00000000]
                 border border-white/20 shadow-[0_0_25px_rgba(0,0,0.5)] 
                 text-white select-none"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Neon progress ring */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out drop-shadow-[0_0_0px_rgb(255,255,255)]"
        />
      </svg>

      {/* Center labels */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-lg font-semibold">
          {Math.round(progress)}%
        </span>
        <span className="text-[10px] opacity-75 mt-0.5">
          {completed} / {total}
        </span>
      </div>
    </div>
  );
}
