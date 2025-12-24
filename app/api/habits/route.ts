import { connectDB } from "../../lib/db/db";
import { NextResponse } from "next/server";
import Habit from "../../lib/models/Habit.model";

export async function GET() {
  try {
    await connectDB();

    const habits = await Habit.find();
    return NextResponse.json({ habits }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const newHabit = await req.json();

    if (!newHabit) {
      return NextResponse.json({ error: "habit cannot be empty" });
    }

    await Habit.create(newHabit);
    return NextResponse.json(
      { message: "habit created successfully", habit: newHabit },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/habits error:", err);
    const message =
      err instanceof Error ? err.message : String(err) || "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const id = await data.id;
    await Habit.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Habit deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, status, userId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Habit ID missing" }, { status: 400 });
    }

    const habit = await Habit.findById(id);
    if (!Habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const prev = habit.status;

    // update status
    habit.status = status;
    await habit.save();

    
  } catch (err) {
    console.error("PUT /api/Habits error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
