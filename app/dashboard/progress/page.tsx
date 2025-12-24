"use client";

import { useEffect, useState } from "react";
import StreakDots from "./components/StreakDots";
import StreakCard from "./components/StreakCard";
import LevelCard from "./components/LevelCard";
import LeagueTimeline from "./components/LeagueTimeline";
import DailyTodoGraph from "./components/DailyTodoGraph";
import BadgeCard from "./components/BadgeCard";
import Cookie from "./components/Cookie";
import { Suspense } from "react";

interface UserProgress {
  streak: number;
  completedDays : {date: string}[];
}

export default function ProgressPage() {
  const userId = process.env.USER_ID; 

  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      const res = await fetch(`/api/progress/${userId}`, { cache: "no-store" });
      const data = await res.json();
      setProgress(data);
    }

    fetchProgress();
  }, []);

  return (
    <>
      <div className="p-6 flex justify-start gap-10 pt-25">

         <div>
      <LevelCard />
    </div>
        <StreakCard userId={userId!} />

        <div className="relative w-3xl rounded-2xl p-2 flex flex-col items-center bg-black/10 backdrop-blur-2xl border border-white/10 shadow-[0px_0px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02]">
          <div className="w-2xl ">
           
     {progress && (
    <LeagueTimeline completedDays={progress.completedDays.length} />
  )}

  {progress && (
   <BadgeCard completedDays={progress.completedDays.length} />
  )}

            </div>
        </div>
      </div>

      <div className="flex gap-10 w-full justify-start pt-10 p-6">
        {progress && (
  <StreakDots completedDays={progress.completedDays} />
)}

     {progress && (
    <DailyTodoGraph></DailyTodoGraph>
  )}
</div>

<div className="mt-20 ">
  <h1 className="text-center text-3xl font-poppins mb-10">Real Talk:</h1>
  <p className="text-center text-sm text-white/50 w-md mx-140">See, there will be days when you'll feel like giving up on everything , but that's when you have to realize it's supposed to be HARD! <br></br> <br></br>The fact that you get up daily and despite all the demotivation , you still try? that deserves appreciation.</p>

  <div className="flex justify-center gap-5 mt-15 mb-15">
  <h1 className=" font-poppins text-center text-xl mt-1">Here's a cookie from our side :  </h1>
  <Cookie></Cookie>
  </div>
</div>
    </>
  );
}
