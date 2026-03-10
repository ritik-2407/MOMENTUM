"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProgress } from "@/app/lib/frontend/getProgress";

interface Progress {
  completedDays: { date: string }[];
}

const getLeague = (completed: number) => {
  if (completed < 5) return "Gold-fish";
  if (completed < 15) return "Slowth";
  if (completed < 30) return "A-dolph";
  if (completed < 60) return "Foxi";
  if (completed < 100) return "Wolfyy";
  if (completed < 150) return "Octas";
  if (completed < 250) return "EAGUL";
  return "OUTLIER";
};

const leagueIcons: Record<string, string> = {
  "Gold-fish": "/leagueIcons/animals/Gold-fish.png",
  Slowth: "/leagueIcons/animals/Slowth.png",
  "A-dolph": "/leagueIcons/animals/A-dolph.png",
  Foxi: "/leagueIcons/animals/Foxi.png",
  Wolfyy: "/leagueIcons/animals/Wolfyy.png",
  Octas: "/leagueIcons/animals/Octas.png",
  EAGUL: "/leagueIcons/animals/EAGUL.png",
  OUTLIER: "/leagueIcons/animals/OUTLIER.png",
};

// Small descriptions
const leagueDescriptions: Record<string, string> = {
  "Gold-fish": "Attention span: 2 sec.",
  Slowth: "Slow… but moving.",
  "A-dolph": "Smart, playful, consistency rising.",
  Foxi: "Clever, sneaky, smarter than yesterday.",
  Wolfyy: "Routine locked. Grinding quietly.",
  Octas: "200 IQ planner. 8 arms. No excuses.",
  EAGUL: "Long-range vision. Precision mode.",
  OUTLIER: "Apex discipline. Peak form.",
};

// Required days for popup info
const requiredDays: Record<string, number> = {
  "Gold-fish": 0,
  Slowth: 5,
  "A-dolph": 15,
  Foxi: 30,
  Wolfyy: 60,
  Octas: 100,
  EAGUL: 150,
  OUTLIER: 250,
};

export default function LevelCard() {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // @ts-ignore
      fetch(`/api/progress/${session.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setProgress(data))
        .catch((err) => console.error(err));
    }
  }, [session, status]);

  if (progress === null) {
    // New users won't have a progress document yet until they complete a Todo
    return (
      <div className="w-sm rounded-2xl p-6 flex flex-col items-center bg-black/10 backdrop-blur-2xl border border-white/10 shadow-[0px_0px_30px_rgba(0,0,0,0.4)]">
        <h2 className="font-poppins text-xl font-bold">L E V E L</h2>
        <p className="font-poppins text-4xl font-extrabold mt-2">1</p>
        <p className="mt-12 font-poppins text-sm text-neutral-400">Complete a Todo to start!</p>
      </div>
    );
  }

  const completed = progress.completedDays?.length || 0;
  const level = Math.floor(completed / 3) + 1;

  const league = getLeague(completed);
  const iconSrc = leagueIcons[league];

  return (
    <div
      className="
      relative
      w-full
      rounded-2xl
      p-6 pb-4
      flex flex-col items-center justify-between
      bg-black/40
      border border-white/5
      shadow-[0_4px_30px_rgba(0,0,0,0.5)]
      transition-all duration-300
      hover:scale-[1.02]
      h-full
      min-h-[320px]
    "
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <h2 className="font-poppins text-md font-semibold tracking-[0.1em] text-white/70">
          L E V E L
        </h2>
        <p className="font-poppins text-[5rem] leading-[1.1] font-extrabold text-white mt-2">
          {level}
        </p>
      </div>

      <div className="flex flex-col items-center flex-1 justify-center mt-2">
        {/* ==== ICON WRAPPER WITH POPUP ==== */}
        <div className="relative group">
          {/* League Icon */}
          <img
            src={iconSrc}
            alt={`${league} icon`}
            className="w-[72px] h-[72px] object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
          />

          {/* Hover Popup */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2 -top-16
              w-44 p-3
              rounded-xl shadow-2xl z-30
              opacity-0 scale-95 pointer-events-none
              transition-all duration-200 ease-out
              group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
              backdrop-blur-3xl bg-[#111111]/90
              border border-white/10
            "
          >
            <div className="font-poppins text-white text-sm font-semibold tracking-wide">{league}</div>
            <div className="text-neutral-400 text-xs mt-1 leading-snug">
              {leagueDescriptions[league]}
            </div>
            <div className="text-[#a8a8a8] text-[10px] mt-2 uppercase tracking-wider font-medium">
              Unlocks at: {requiredDays[league]} days
            </div>
          </div>
        </div>
        {/* ==== END ICON WRAPPER ==== */}

        <h2 className="mt-3 font-poppins text-lg font-bold tracking-widest text-white uppercase drop-shadow-sm">
          {league}
        </h2>
      </div>

      <p className="mt-auto pt-4 font-poppins text-[13px] tracking-wide text-white/40">
        Completed Days: {completed}
      </p>
    </div>
  );
}
