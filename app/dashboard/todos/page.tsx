"use client";

import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ProgressCircle from "./components/ProgressCircle";
import QuotationCard from "./components/QuotationCard";
import DontsCard from "./components/DontsCard";

export interface Todo {
  _id: string;
  todo: string;
  tier: "A" | "B" | "C";
  status: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
    // Fire-and-forget cleanup of buckets older than 14 days
    fetch("/api/todos/cleanup", { method: "POST" }).catch(() => {});
  }, []);

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data.todos);
  }

  async function addTodo(todo: string, tier: "A" | "B" | "C") {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, tier }),
    });

    fetchTodos(); // refresh UI
  }

  async function toggleTodo(id: string) {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    const newStatus = !todo.status;
    await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    // Update UI after successful backend update
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)),
    );
  }

  async function deleteTodo(id: string) {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTodos((prev) => prev.filter((t) => t._id !== id));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1800px] mx-auto min-h-screen">
      {/* ── THE FOCUS CENTER GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mt-22">
        {/* LEFT COLUMN: Main Todos Area */}
        <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-black/20 rounded-2xl border border-white/5 p-6 sm:p-8 md:p-10 flex-col flex h-full">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-10 text-white font-poppins tracking-wide">
              So, I wanna do...
            </h1>

            <TodoForm onAdd={addTodo} />
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats & Quotes */}
        <div className=" md:col-span-4 lg:col-span-4 flex flex-col gap-6">
           <div className="order-1 md:order-1 h-auto min-h-[350px] relative">
            <DontsCard />
          </div>

          <div className="order-2 md:order-2 bg-black/20 rounded-2xl border border-white/5 p-6 flex flex-col min-h-[200px]">
            
            <h1 className="text-3xl sm:text-2xl font-semibold mb-10 text-white/40 font-poppins tracking-wide">
              Progress
            </h1>
            <ProgressCircle todos={todos} size={110} />
          </div>

          {/* Quotation Card Wrapper */}
          
        </div>
      </div>
    </div>
  );
}
