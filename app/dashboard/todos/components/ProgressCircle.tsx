"use client";
import { useMemo } from "react";

type Todo = {
  status: boolean;
  tier: "A" | "B" | "C";
};

interface ProgressCircleProps {
  todos: Todo[];
  size?: number;
  strokeWidth?: number;
}

const TIER_META = {
  A: { label: "T1",   opacity: 1.0 , color: `rgba(248, 93, 93, 1)`  },
  B: { label: "T2",  opacity: 0.45 , color: "rgba(248, 224, 105, 1)" },
  C: { label: "T3",   opacity: 0.2 , color: "rgba(150, 245, 150, 0.8)"  },
} as const;



export default function ProgressCircle({
  todos,
  size = 120,
  strokeWidth = 5,
}: ProgressCircleProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.status).length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const tierStats = useMemo(() =>
    (["A", "B", "C"] as const).map((tier) => {
      const tierTodos = todos.filter((t) => t.tier === tier);
      const tierDone  = tierTodos.filter((t) => t.status).length;
      const pct       = tierTodos.length === 0 ? 0 : (tierDone / tierTodos.length) * 100;
      return { tier, done: tierDone, total: tierTodos.length, pct };
    }), [todos]
  );

  return (
    <div className="w-full flex items-center gap-6">

      {/* ── LEFT: Main arc ── */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform absolute inset-0">
          <circle
            r={radius} cx={size / 2} cy={size / 2}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth} fill="transparent"
          />
          <circle
            r={radius} cx={size / 2} cy={size / 2}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={strokeWidth} fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-light text-white tabular-nums leading-none">
            {Math.round(progress)}%
          </span>
          
        </div>
      </div>

      {/* ── RIGHT: Tier arcs ── */}
      <div className="flex flex-col gap-4 flex-1">
        {tierStats.map(({ tier, done, total: t, pct }) => {
          const meta = TIER_META[tier];
          return (
            <div key={tier} className="flex items-center gap-3">
              {/* Label + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: `rgba(255,255,255, 0.7)` }}
                  >
                    {meta.label}
                  </span>
                  <span
                    className="text-[9px] tabular-nums"
                    style={{ color: `rgba(255,255,255, 0.7)` }}
                  >
                    {done}/{t}
                  </span>
                </div>

                {/* Thin progress bar */}
                <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${pct}%`,
                      background: `${meta.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}