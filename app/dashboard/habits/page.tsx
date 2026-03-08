'use client' 
import {useState , useEffect} from 'react'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import Clock from "@/app/components/Clock";
import ProgressCircle from "./components/ProgressCircle"; 



export interface Habit {
  _id: string,
  habit: string,
  status: Boolean
}



const page = () => {

  useEffect(() => {
  fetchHabits()
} , [])


  const [habits, setHabits] = useState<Habit[]>([]);

  
async function addHabit(habit: string){

  await fetch('/api/habits' , {

    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({habit})
  });

  fetchHabits();

  
};

async function fetchHabits(){

 const res  =  await fetch('/api/habits')
 const data = await res.json();
 setHabits (data.habits)
}

 async function toggleHabit(id: string) {
  const todo = habits.find(t => t._id === id);
  if (!todo) return;

  const newStatus = !todo.status;
  await fetch("/api/habits", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      status: newStatus
    })
  });

  // Update UI after successful backend update
  setHabits(prev =>
    prev.map(t => (t._id === id ? { ...t, status: newStatus } : t))
  );
}

async function deleteHabit(id: string) {
    await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setHabits(prev => prev.filter(t => t._id !== id));
  }

  return (
    <>
    <div className="text-4xl pt-7 pl-10 font-poppins text-amber-50">
          <Clock></Clock>
        </div>

<div className="flex justify-between mt-25 ">

        <div className=" pl-35 mt-40">
          <ProgressCircle habits={habits} size={200} />
        </div>

    <div className='mr-150 flex   flex-col justify-center items-center '>
      <h1 className="text-4xl font-semibold mb-14">So, I usually do...</h1>
      <HabitForm onAdd = {addHabit}></HabitForm>
      <HabitList habits = {habits}  onToggle = {toggleHabit} onDelete = {deleteHabit}></HabitList>
    </div>
</div>
    </>
  )
}

export default page
