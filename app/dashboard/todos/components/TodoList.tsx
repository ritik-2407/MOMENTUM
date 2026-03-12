"use client";

import { Todo } from "../page"; // Adjust import path if needed

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // 1. Structurally segregate the todos
  const tierA = todos.filter((t) => t.tier === "A");
  const tierB = todos.filter((t) => t.tier === "B");
  const tierC = todos.filter((t) => t.tier === "C");

  // 2. Create a reusable render function for the items
  const renderTodoItem = (todo: Todo, textStyle: string) => (
    <div
      key={todo._id}
      className={`group flex items-center justify-between p-4 border-b border-white/5 transition-all duration-300 hover:bg-white/[0.02] last:border-0 ${
        todo.status ? "opacity-20 line-through" : "opacity-100"
      }`}
    >
      <button
        onClick={() => onToggle(todo._id)}
        className="flex items-center gap-4 w-full  text-left group cursor-pointer"
      >
        {/* Checkbox */}
        <div
          className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            todo.status
              ? "bg-white/20 border-white/20"
              : "border-white/20 group-hover:border-white/60"
          }`}
        >
          {todo.status && <div className="w-2 h-2 rounded-full bg-white/80" />}
        </div>

        {/* Text */}
        <span
          className={`font-light tracking-wide transition-colors ${textStyle}`}
        >
          {todo.todo}
        </span>
      </button>

      {/* Delete button: Invisible until hovered to keep UI clean */}
      <button
        onClick={() => onDelete(todo._id)}
        className="cursor-pointer text-[11px] uppercase tracking-wider text-transparent group-hover:text-red-400 hover:!text-white/80 transition-colors"
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 mt-6 overflow-y-auto pr-2">
      {/* ── TIER A: PRIMARY FOCUS ── */}
      {tierA.length > 0 && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h3 className="text-xs font-medium tracking-[0.25em] text-white/70 mb-3 pl-2">
            TIER 1
          </h3>
          {/* Subtle container box for highest priority */}
          <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.01] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {tierA.map((todo) =>
              renderTodoItem(todo, "text-white/95 font-normal"),
            )}
          </div>
        </div>
      )}

      {/* ── TIER B: SECONDARY ── */}
      {tierB.length > 0 && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3 pl-2">
            TIER 2
          </h3>
          <div className="flex flex-col rounded-xl border border-white/5 overflow-hidden">
            {tierB.map((todo) => renderTodoItem(todo, "text-white/60"))}
          </div>
        </div>
      )}

      {/* ── TIER C: BACKLOG ── */}
      {tierC.length > 0 && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20 mb-3 pl-2">
            TIER 3
          </h3>
          {/* Stripped back design for lowest priority */}
          <div className="flex flex-col border-l border-white/5 ml-2 pl-2">
            {tierC.map((todo) => renderTodoItem(todo, "text-white/30 italic"))}
          </div>
        </div>
      )}

      {todos.length === 0 && (
        <div className="flex items-center justify-center h-40 text-white/20 italic text-sm font-light">
          Your mind is clear. Add a task to begin.
        </div>
      )}
    </div>
  );
}
