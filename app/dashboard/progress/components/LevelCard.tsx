"use client";

import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    fetch("/api/progress/691a1bdfe20a80340944fd1e")
      .then((res) => res.json())
      .then((data) => setProgress(data));
  }, []);

  if (!progress) return <div>Loading...</div>;
 const completed = progress.completedDays.length;
  const level = Math.floor(completed / 3) + 1;

  const league = getLeague(completed);
  const iconSrc = leagueIcons[league];

  return (
    <div
      className="
      relative
      w-sm
      rounded-2xl
      p-6
      flex flex-col items-center
      bg-black/10
      backdrop-blur-2xl
      border border-white/10
      shadow-[0px_0px_30px_rgba(0,0,0,0.4)]
      transition-all duration-300
      hover:scale-[1.02]
    "
    >
      <h2 className="font-poppins text-xl font-bold">L E V E L</h2>
      <p className="font-poppins text-4xl font-extrabold mt-2">{level}</p>

      {/* ==== ICON WRAPPER WITH POPUP ==== */}
      <div className="relative group mt-4">
        {/* League Icon */}
        <img
          src={iconSrc}
          alt={`${league} icon`}
          className="w-20 h-20 cursor-pointer transition-all duration-150 group-hover:scale-105"
        />

        {/* Hover Popup */}
        <div
          className="
  absolute left-38 -translate-x-1/2 -top-10
  w-25 p-4
  rounded-xl shadow-xl z-30
  opacity-0 scale-95 pointer-events-none
  transition-all duration-200 ease-out
  group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto

  backdrop-blur-2xl backdrop-saturate-150
  bg-white/3
  border border-white/20
"
        >
          <div className="font-poppins text-white text-sm">{league}</div>

          <div className=" text-neutral-300 text-xs mt-2">
            {leagueDescriptions[league]}
          </div>

          <div className="text-neutral-400 text-[10px] mt-2">
            Unlocks at: {requiredDays[league]} days
          </div>
        </div>
      </div>
      {/* ==== END ICON WRAPPER ==== */}

      <h2 className="mt-3 font-poppins text-xl font-bold">{league}</h2>

      <p className="mt-12 font-poppins text-sm text-neutral-400">
        Completed Days: {completed}
      </p>
    </div>
  );
}
