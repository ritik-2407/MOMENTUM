"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

interface ProgressData {
  streak: number;
  lastUpdated?: string;
}

export default function StreakCard({ userId }: { userId: string }) {
  const [data, setData] = useState<ProgressData | null>(null);

  const streakMessages: Record<number, string> = {
  1: "It's never too late to start.",
  2: "Its just day two and you're looking here like we'll give you some validation lmao",
  3: "Wait, You look serious this time",
  4: "No way! bro is actually starting",
  5: "Let's go — you're gaining momentum!",
  6: "The Consistency is forming up champ!",
  7: "One full week. You're locked in.",
  10: "Double digits — discipline activated.",
  15: "Most people quit by now. You didn’t.",
  20: "You’re building a different identity.",
  30: "A whole month. Unreal focus.",
  34: "With this consistency, you can achieve anything!",
  50: "Halfway to 100! Your dedication is inspiring.",
  75: "75 days strong! You're a true example of perseverance.",
  100: "Centurion status! You've mastered the art of consistency.",
};


  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/progress/${userId}`, { cache: "no-store" });
      const json = await res.json();
      setData(json);
    }
    load();
  }, [userId]);

  if (!data) {
    return (
      <div className="w-full h-40 rounded-2xl bg-black/30 backdrop-blur-xl animate-pulse border border-white/10" />
    );
  }

  return (
    <div className="
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
    ">
      
      {/* Subtle Top Gradient Glow */}
      <div  />

      {/* Fire Icon */}
      <div className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-3">
        <Flame className="h-7 w-7 text-orange-400 drop-shadow-[0_0_5px_rgba(255,150,0,0.8)]" />
      </div>

      {/* Streak Label */}
      <h2 className="text-lg font-poppins tracking-wide text-white/80">Current Streak</h2>

      {/* Streak Number */}
      <p className="
        font-poppins text-7xl font-semibold text-white mt-8
        drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]
        animate-[fadeIn_0.7s_ease-out]
      ">
        {data.streak}
      </p>

      <p className=" text-center text-xs font-roboto text-white/40 mt-13">
  {
    streakMessages[data.streak] 
    }
  
</p>


      {/* Subtle bottom line shine */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
