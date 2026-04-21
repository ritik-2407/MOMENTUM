"use client";

import { Flame } from "lucide-react";

interface StreakCardProps {
  streak: number;
}

export default function StreakCard({ streak }: StreakCardProps) {
const streakMessages: Record<number, string> = {
  0: "Start today. Or don’t. I’m not your mother.",
  1: "Day one. The easiest day to lie to yourself.",
  2: "Two days? Cute. Call me when it’s two weeks.",
  3: "Day three. Either momentum… or a very convincing fluke.",
  4: "Four days in. Honestly, I expected less.",
  5: "Five days. Still here? Weirdly impressive.",
  6: "Six days. Your couch misses you. Tragic.",
  7: "One week. Your bed has filed a missing person report.",
  8: "Eight days straight. Even your excuses are getting tired.",
  9: "Nine days. Your old habits are starting to panic.",
  10: "Double digits. Finally, a streak longer than your attention span.",
  11: "Eleven days. Suspiciously consistent. Who are you?",
  12: "Twelve days. A full dozen. Your lazy self is in shambles.",
  13: "Day 13. Unlucky for your procrastination habit.",
  14: "Two weeks. Your Netflix queue is in mourning.",
  15: "Fifteen days. Most people quit by now. You didn’t. Disturbing.",
  16: "Sweet sixteen. Your old habits are throwing a tantrum.",
  17: "Seventeen days. You're starting to make discipline look personal.",
  18: "Day 18. Legally an adult in streak years.",
  19: "Nineteen. One step away from making this look intentional.",
  20: "Twenty days. At this point, you're becoming the kind of person you said you'd be.",
  21: "Three weeks. Your excuses are now a non-playable character.",
  22: "Day 22. Can’t stop now. That’d be embarrassingly on-brand.",
  23: "Twenty-three. Michael Jordan’s number. Try not to fumble the legacy.",
  24: "24 days. One for every hour you could’ve wasted, but didn’t.",
  25: "Twenty-five days. Quarter-century of not quitting. Miraculous.",
  26: "Day 26. Your consistency is getting unreasonably hard to ignore.",
  27: "Twenty-seven days. At this point, laziness has trust issues.",
  28: "Four weeks. Your calendar is starting to take you seriously.",
  29: "Day 29. One day from 30. Don’t do something stupid.",
  30: "A full month. Impressive. Or maybe you’ve just Stockholm-syndromed yourself into discipline.",
  31: "31 days. A whole month plus bonus suffering.",
  33: "Thirty-three days. Weird number. Strong streak.",
  34: "This kind of consistency can take you far. Socially? Maybe not.",
  36: "Day 36. Six squared. Nerdy, but effective.",
  40: "Forty days in. Biblical levels of commitment.",
  42: "42 days. The answer to life, the universe, and your laziness problem.",
  45: "45 days. Midlife crisis of a streak. Don’t buy a sports car.",
  49: "Day 49. One away from 50. Your excuses are visibly sweating.",
  50: "Halfway to 100. Now you're not just trying — you're becoming annoying to quitters."
};


  return (
    <div className="
      relative
      w-full
      rounded-2xl
      p-6 pb-5
      flex flex-col items-center justify-between
      bg-black/20
      border border-white/5
      
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
          {streak}
        </p>
      </div>

      {/* Footer message */}
      <p className="mt-auto font-poppins text-[15px] text-center text-[#6b6b6b] leading-relaxed max-w-[80%]">
        {streakMessages[streak] || "Zero days down. Only one way up!"}
      </p>
    </div>
  );
}
