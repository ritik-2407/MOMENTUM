"use client";
import { Habit } from "../page";

interface ListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onToggle, onDelete }: ListProps) {
  function renderHabit(t: Habit) {
    return (
      <div
        key={t._id}
        className="flex items-center justify-between  p-2 rounded-lg ">

        <div className="flex items-center gap-3 ">
          <button
            onClick={() => onToggle(t._id)}
            className={`
    w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-300 ease-out
    ${
      t.status
        ? "bg-white scale-60 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        : "border-2 border-white shadow-[0_0_5px_white] hover:scale-110"
    }
  `}
          />

          <span
            className={t.status ? "line-through text-gray-500" : "font-poppins"}
          >
            {t.habit}
          </span>
        </div>

        <button
          onClick={() => onDelete(t._id)}
          className="transition-all duration-200 hover:scale-120 "
        >
          <img src="/icons/delete.png" alt="delete icon" className="w-4 h-4 opacity-35" />
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="w-full max-w-md  border rounded-2xl p-5 border-gray-500">
      {habits.length === 0 && <p className="text-gray-500">No habits yet...</p>}

      {/* DISPLAY HABITS HERE */}
      {habits.map(renderHabit)}

      
    </div>
    
    </>
  );
}
