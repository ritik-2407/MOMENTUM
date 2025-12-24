"use client";

import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Clock from "@/app/components/Clock";
import ProgressCircle from "./components/ProgressCircle"; 
import QuotationCard from "./components/QuotationCard";

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
  const todo = todos.find(t => t._id === id);
  if (!todo) return;

  const newStatus = !todo.status;
  const userId = "691a1bdfe20a80340944fd1e";  // hardcoding the actual id due to client component 

  await fetch("/api/todos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      status: newStatus,
      userId 
    })
  });

  // Update UI after successful backend update
  setTodos(prev =>
    prev.map(t => (t._id === id ? { ...t, status: newStatus } : t))
  );
}


  async function deleteTodo(id: string) {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTodos(prev => prev.filter(t => t._id !== id));
  }

  return (
    <>
    <div className="text-4xl pt-7 pl-10 font-poppins text-amber-50">
      <Clock></Clock>
    </div>

    <div className="flex justify-between  mt-25  ">
    
   <div className="ml-25 mr-35 mt-35">
  <ProgressCircle todos={todos} size={200} />
</div>


    <div className="flex items-center justify-between flex-col ml-20 mr-18">
      <h1 className="text-4xl font-semibold mb-14">So, I wanna do...</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>

    <div  className="pr-10  pt-45">

    <QuotationCard></QuotationCard>
    </div>

    </div>
    </>
  );
}
