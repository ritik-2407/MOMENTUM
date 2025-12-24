"use client";
import { useState } from "react";

interface Props {
  onAdd: (habit: string) => void;
}

export default function habitForm({ onAdd }: Props) {
  const [habit, setHabit] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!habit.trim()) return;
    await onAdd(habit);
    setHabit("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        type="text"
        placeholder="procrastination?"
        className="italic text-sm text-white/40 border-2 border-white rounded-full px-4 py-3 w-64 focus:ring-1 focus:ring-white focus:shadow-[0_0_9px_1px_rgba(255,255,255,0.6)] outline-none hover:scale-103 transition-all duration-200"
      />

      <button
        type="submit"
        className="ml-5 text-black bg-white border border-gray-300 rounded-full px-5 py-2 hover:scale-105 transition-all duration-200"
      >
        Add
      </button>
    </form>
  );
}
