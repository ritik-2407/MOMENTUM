"use client";
import { Todo } from "../page";

interface ListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: ListProps) {
  const tierA = todos.filter((t) => t.tier === "A");
  const tierB = todos.filter((t) => t.tier === "B");
  const tierC = todos.filter((t) => t.tier === "C");

  function renderTodo(t: Todo) {
    return (
      <div
        key={t._id}
        className="flex items-center justify-between p-1 rounded-lg"
      >
        <div className="flex items-center gap-3 ">
          <button
            onClick={() => onToggle(t._id)}
            className={`
    w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-300 ease-out
    ${
      t.status
        ? "bg-white scale-60   hover:scale-70 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        : t.tier === "A"
        ? " transition-all duration-200 hover:scale-110 border-2 border-red-200 shadow-[0_0_7px_red]"
        : t.tier === "B"
        ? "transition-all duration-200 hover:scale-110 border-2 border-yellow-100 shadow-[0_0_5px_yellow]"
        : "transition-all duration-200 hover:scale-110 border-2 border-green-300 shadow-[0_0_7px_green]"
    }
  `}
          />
          <span
            className={t.status ? "line-through text-gray-500" : "font-poppins"}
          >
            {t.todo}
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
    <div className="w-full max-w-md space-y-1 border rounded-2xl p-5 border-gray-500">
      {todos.length === 0 && <p className="text-gray-500">No todos yet...</p>}

      {tierA.length > 0 && (
        <h3 className="text-lg font-bold font-poppins  mt-4 text-red-500 opacity-50"></h3>
      )}
      <div className="text-lg">
        {tierA.map(renderTodo)}
        </div>

      {tierB.length > 0 && (
        <h3 className="text-lg font-bold font-poppins mt-4 text-yellow-500 opacity-50"></h3>
      )}
      <div className="text-md">

      {tierB.map(renderTodo)}
      </div>

      {tierC.length > 0 && (
        <h3 className="text-lg font-bold font-poppins mt-4 text-green-400 opacity-50"></h3>
      )}
      <div className="text-sm">

      {tierC.map(renderTodo)}
      </div>

      
    </div>
    {todos.length > 0 && (
        <h1 className="text-center text-gray-500 pt-10 text-sm font-roboto  italic ">
          only this much?
        </h1>
      )}
      </>
  );
}
