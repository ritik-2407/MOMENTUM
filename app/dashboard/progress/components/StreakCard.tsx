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
      try {
        const res = await fetch(`/api/progress/${userId}`, { cache: "no-store" });
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch streak");
        const json = await res.json();
        setData(json || { streak: 0 });
      } catch (err) {
        console.error(err);
        setData({ streak: 0 }); // Fallback for new users or errors
      }
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
      w-full
      rounded-2xl
      p-6 pb-5
      flex flex-col items-center justify-between
      bg-black/40
      border border-white/5
      shadow-[0_4px_30px_rgba(0,0,0,0.5)]
      transition-all duration-300
      hover:scale-[1.02]
      h-full
      min-h-[320px]
    ">
      
      {/* Container for top content (Icon + Label) */}
      <div className="flex flex-col items-center mt-2 w-full">
        {/* Fire Icon */}
        <div className="p-[10px] rounded-full bg-[#141414] border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] mb-4">
          <Flame className="h-6 w-6 text-[#ff8b3d] drop-shadow-[0_0_8px_rgba(255,139,61,0.6)]" />
        </div>

        {/* Streak Label */}
        <h2 className="text-md font-poppins tracking-[0.2em] text-[#a8a8a8] font-medium">
          STREAK
        </h2>
      </div>

      {/* Streak Number - Flex-1 perfectly centers it vertically between the top and bottom text */}
      <div className="flex flex-1 items-center justify-center w-full">
        <p className="
          font-poppins text-[5.5rem] leading-[1] font-bold text-white
          drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]
          animate-[fadeIn_0.5s_ease-out]
        ">
          {data.streak}
        </p>
      </div>

      {/* Footer message */}
      <p className="mt-auto font-poppins text-[15px] text-center text-[#6b6b6b] leading-relaxed max-w-[80%]">
        {streakMessages[data.streak] || "Zero days down. Only one way up!"}
      </p>
    </div>
  );
}
