"use client";
import { useState } from "react";

interface Props {
  onAdd: (todo: string, tier: "A" | "B" | "C") => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [todo, setTodo] = useState("");
  const [tier, setTier] = useState<"A" | "B" | "C">("A");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!todo.trim()) return;
    onAdd(todo, tier);
    setTodo("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full relative group">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="DSA?"
          className="w-full italic text-sm text-white/90 bg-white/5 border border-white/10 rounded-full px-6 py-3 focus:bg-white/10 focus:ring-1 focus:border-white/30 focus:outline-none transition-all duration-300 placeholder-white/30"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value as "A" | "B" | "C")}
          className="
            px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 cursor-pointer
            appearance-none text-sm
            hover:bg-white/10 hover:text-white
            focus:outline-none focus:border-white/30 transition-all duration-300
          "
        >
          <option value="A" className="bg-[#111] text-white">T1</option>
          <option value="B" className="bg-[#111] text-white">T2</option>
          <option value="C" className="bg-[#111] text-white">T3</option>
        </select>

        <button
          type="submit"
          className="text-black bg-white font-medium rounded-full px-8 py-3 hover:scale-[1.03] shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-[0.98]"
        >
          Add
        </button>
      </div>
    </form>
  );
}
