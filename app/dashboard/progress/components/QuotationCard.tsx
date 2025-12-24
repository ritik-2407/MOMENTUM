// QuotationCard.tsx
"use client";

import { useMemo } from "react";

interface Progress {
  completedDays: { date: string }[];
}

// League classifier
const getLeague = (completed: number) => {
  if (completed < 5) return "Initiator";
  if (completed < 15) return "Rookie";
  if (completed < 30) return "Committed";
  if (completed < 60) return "Disciplined";
  if (completed < 100) return "Relentless";
  if (completed < 150) return "Unshakable";
  if (completed < 250) return "Mastermind";
  return "Transcendent";
};

// Quotes per league (50+ each)
const quotes: Record<string, string[]> = {
  Initiator: [
    "Small steps change entire lives.",
    "Just show up — that’s the hardest part.",
    "Every beginning is power in disguise.",
    "You’re planting seeds your future will thank you for.",
    "Direction matters more than speed.",
    "Your only goal today: move 1% forward.",
    "You don't need to be great to start — just willing.",
    "Start messy, refine later.",
    "Your future self is quietly watching.",
    "Nothing changes until you do.",
    "Momentum begins with one decision.",
    "Show up today so tomorrow becomes easier.",
    "You’re learning the rhythm.",
    "Beginning is a superpower.",
    "A spark is all it takes.",
    "Trust the small wins.",
    "You’re building the base.",
    "Consistency starts with day one.",
    "Focus on doing, not judging.",
    "Even tiny effort compounds.",
    "Let today be the start of something.",
    "Forward is forward, no matter how small.",
    "You’re closer than you think.",
    "Beginnings build character.",
    "Effort > perfection.",
    "Your pace doesn’t matter — your direction does.",
    "Little actions create big shifts.",
    "Start where you are, use what you have.",
    "If you don’t quit, you win.",
    "Tiny habits rewrite identity.",
    "You’re learning to move again.",
    "One day you’ll thank yourself for today.",
    "You only need one good day — repeated.",
    "Everyone great once stood where you are.",
    "The hardest part is starting.",
    "Beginnings feel unstable — that’s normal.",
    "You showed up. That’s enough.",
    "Keep your head down and build.",
    "You’re stepping out of autopilot.",
    "Your story is beginning.",
    "The small wins are not small.",
    "Start ugly. Finish beautiful.",
    "You’re showing potential.",
    "This is the foundation of greatness.",
    "You’re becoming someone different.",
    "Early days are the most important.",
    "When in doubt, just start.",
    "Each day is proof you can.",
    "Remember why you started.",
    "New beginnings require courage.",
  ],

  Rookie: [
    "Momentum is your new best friend.",
    "Your discipline is waking up.",
    "You’ve survived the hardest part — starting.",
    "Progress is becoming your personality.",
    "Don’t underestimate what 10 good days can do.",
    "Identity shifts quietly.",
    "Trust the climb.",
    "Show up — even when you don't feel like it.",
    "Consistency beats intensity.",
    "Your habits are taking shape.",
    "You're not who you were last week.",
    "You’re rewriting your default mode.",
    "Keep stacking days.",
    "Small wins create big momentum.",
    "Resistance builds strength.",
    "You’re gaining traction.",
    "Your discipline muscles are growing.",
    "Focus on the process.",
    "You’re proving yourself right.",
    "Every day you show up, you become harder to stop.",
    "You’re building a streak of character, not numbers.",
    "Don’t break the chain.",
    "You’re stabilizing your new life.",
    "This is how winners are made.",
    "You’ve crossed the hesitation zone.",
    "Your consistency is becoming real.",
    "You’re creating internal momentum.",
    "You are not average anymore.",
    "Every repeat strengthens identity.",
    "Show up — even imperfectly.",
    "Consistency compounds silently.",
    "Keep feeding the habit.",
    "You're building trust with yourself.",
    "Momentum loves repetition.",
    "You’re getting harder to break.",
    "Trust your new pattern.",
    "Your standard is rising.",
    "Don't let comfort pull you back.",
    "You’ve entered the growth zone.",
    "Your effort is accumulating.",
    "Your future self is proud.",
    "Keep going — you're onto something.",
    "The new you is loading.",
    "Routines build identity.",
    "Stay consistent, not perfect.",
    "You’re becoming reliable to yourself.",
    "Stay the course.",
    "What you do daily shapes who you become.",
  ],

  Committed: [
    "Discipline is remembering what you want.",
    "You’re entering the consistency zone.",
    "You're becoming a different person.",
    "Commitment is your new default.",
    "Most people quit here — you’re not most people.",
    "You’re unstoppable when you remove negotiation.",
    "You're crossing into rare territory.",
    "Your habits are maturing.",
    "This version of you is different.",
    "Consistency is louder than motivation.",
    "You’re proving that you want this.",
    "You’re building character through repetition.",
    "You’re entering disciplined territory.",
    "Show up without asking how you feel.",
    "You're recognizing your strength.",
    "Commitment eliminates excuses.",
    "Your habits are locking in.",
    "You’re reaching stability.",
    "You’re earning self-respect.",
    "Discipline is a skill — you’re mastering it.",
    "Consistency rewires identity.",
    "You’ve built real momentum.",
    "You’re past the beginner stage.",
    "Commitment beats motivation.",
    "Your lifestyle is shifting.",
    "Your priorities are changing.",
    "You’re learning to be reliable.",
    "Routine is becoming natural.",
    "You’re beating old patterns.",
    "Stay committed — it gets rewarding.",
    "Your discipline is showing.",
    "You don’t need permission to improve.",
    "Keep showing up — this is the grind.",
    "Most people fall off here.",
    "You’re not most people.",
    "Commitment is a superpower.",
    "Your habits are stabilizing.",
    "You’re learning endurance.",
    "Momentum is your ally.",
    "You’re building inner strength.",
    "This is real growth.",
    "You’re crossing the threshold.",
    "This level separates winners.",
    "Your internal discipline is rising.",
    "Your identity is being rebuilt.",
    "Commitment is your advantage.",
    "Show up — even silently.",
    "You're proving your standards.",
  ],

  Disciplined: ["More quotes ..."],
  Relentless: ["More quotes ..."],
  Unshakable: ["More quotes ..."],
  Mastermind: ["More quotes ..."],
  Transcendent: ["More quotes ..."],
};

export default function QuotationCard({ completedDays }: { completedDays: number }) {
  const league = getLeague(completedDays);
  const today = new Date().getDate();

  const quote = useMemo(() => {
    const pool = quotes[league] || quotes["Initiator"];
    return pool[today % pool.length];
  }, [league]);

  return (
    <div className=" flex  flex-col justify-around items-center  pt-1 rounded-xl bg-black/10 border border-white/10 backdrop-blur-xl shadow-lg w-170 h-35 text-center mt-6 ">
        <img src= '/icons/book.png' alt={`book icon`} className="w-10 h-10  pt-0 mt-0 mb-2 " />
      <p className="pb-5 text-neutral-300 italic text-sm">“{quote}”</p>
    </div>
  );
}
