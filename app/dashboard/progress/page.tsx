"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import StreakDots from "./components/StreakDots";
import StreakCard from "./components/StreakCard";
import LevelCard from "./components/LevelCard";
import LeagueTimeline from "./components/LeagueTimeline";
import DailyTodoGraph from "./components/DailyTodoGraph";
import BadgeCard from "./components/BadgeCard";
import Cookie from "./components/Cookie";

interface UserProgress {
  streak: number;
  completedDays: { date: string }[];
}

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      if (status === "authenticated" && session?.user) {
        try {
          // @ts-ignore
          const res = await fetch(`/api/progress/${session.user.id}`, { cache: "no-store" });
          if (!res.ok) throw new Error("Failed to fetch progress");
          const data = await res.json();
          setProgress(data || { streak: 0, completedDays: [] });
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchProgress();
  }, [session, status]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1800px] mx-auto">
      
      {/* ── THE COMMAND CENTER GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-22">
        
        {/* Loading Skeleton */}
        {(status === "loading" || progress === null) ? (
          <>
            {/* ROW 1 */}
            {/* Level Skeleton */}
            <div className="lg:col-span-1 h-full min-h-[320px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />

            {/* Streak Skeleton */}
            <div className="lg:col-span-1 h-full min-h-[320px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />

            {/* League Timeline + Badges Skeleton */}
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl p-6 flex flex-col justify-center animate-pulse bg-white/5 border border-white/10 h-full min-h-[320px]" />

            {/* ROW 2 */}
            {/* Monthly streak heatmap Skeleton */}
            <div className="md:col-span-2 lg:col-span-3 min-w-0 animate-pulse bg-white/5 rounded-2xl border border-white/10 h-[250px]" />

            {/* Daily todos bar chart Skeleton */}
            <div className="md:col-span-2 lg:col-span-1 w-full h-full min-h-[350px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />
          </>
        ) : (
          <>
            {/* ROW 1 */}
            {/* Level */}
            <div className="lg:col-span-1 h-full">
              <LevelCard />
            </div>

            {/* Streak */}
            <div className="lg:col-span-1 h-full">
              {status === "authenticated" && session?.user ? (
                // @ts-ignore
                <StreakCard userId={session.user.id} />
              ) : null}
            </div>

            {/* League Timeline + Badges */}
            <div className="md:col-span-2 lg:col-span-2 relative rounded-2xl p-6 flex flex-col justify-center bg-black/20 border border-white/5 h-full min-h-[320px]">
              <LeagueTimeline completedDays={progress.completedDays?.length || 0} />
              <BadgeCard completedDays={progress.completedDays?.length || 0} className="mt-4" />
            </div>

            {/* ROW 2 */}
            {/* Monthly streak heatmap */}
            <div className="md:col-span-2 lg:col-span-3 min-w-0 bg-black/20 rounded-2xl border border-white/5 p-4 sm:p-6 flex items-center justify-center">
              <StreakDots completedDays={progress.completedDays || []} />
            </div>

            {/* Daily todos bar chart */}
            <div className="md:col-span-2 lg:col-span-1 w-full h-full min-h-[350px]">
              <DailyTodoGraph />
            </div>
          </>
        )}

      </div>

      {/* ── Real Talk section ── */}
      <div className="mt-16 mb-12 text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-poppins mb-6">Keep Going!!</h1>
        

        <div className="flex justify-center items-center gap-4 mt-10">
          <h1 className="font-poppins text-lg sm:text-xl">Here&apos;s a cookie from my side:</h1>
          <Cookie />
        </div>
      </div>
    </div>
  );
}
