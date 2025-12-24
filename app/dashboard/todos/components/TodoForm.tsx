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
    <form onSubmit={handleSubmit} className="mb-8">
    <input
  value={todo}
  onChange={(e) => setTodo(e.target.value)}
  type="text"
  placeholder="umm..."
  className="italic text-sm text-white/40 border-2 border-white rounded-full px-4 py-3 w-64 focus:ring-1 focus:ring-white focus:shadow-[0_0_9px_1px_rgba(255,255,255,0.6)] outline-none hover:scale-103 transition-all duration-200"
/>


      <select
        value={tier}
        onChange={(e) => setTier(e.target.value as "A" | "B" | "C")}
        className="
    ml-3 px-5 py-2 rounded-full border-2 border-white/50
    appearance-none
    hover:bg-amber-50 hover:text-black
    focus:outline-none focus:border-white/50 focus:ring-0
  "
      >
        <option value="A" className="bg-gray-900 text-white">
          T1
        </option>
        <option value="B" className="bg-gray-900 text-white">
          T2
        </option>
        <option value="C" className="bg-gray-900 text-white">
          T3
        </option>
      </select>

      <button
        type="submit"
        className="ml-5 text-black bg-white border border-gray-300 rounded-full px-5 py-2 hover:scale-105 transition-all duration-200 "
      >
        Add
      </button>
    </form>
  );
}
