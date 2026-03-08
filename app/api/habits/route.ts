import { connectDB } from "../../lib/db/db";
import { NextResponse } from "next/server";
import Habit from "../../lib/models/Habit.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const habits = await Habit.find({ userId: (session.user as any).id });
    
    return NextResponse.json({ habits }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const newHabitData = await req.json();

    if (!newHabitData || !newHabitData.habit) {
      return NextResponse.json({ error: "Habit cannot be empty" }, { status: 400 });
    }

    // Automatically attach userId from session
    const habitToCreate = {
      ...newHabitData,
      userId: (session.user as any).id,
    };

    const newHabit = await Habit.create(habitToCreate);
    return NextResponse.json(
      { message: "habit created successfully", habit: newHabit },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/habits error:", err);
    const message = err instanceof Error ? err.message : String(err) || "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    const id = data.id;

    // Ensure the habit belongs to the user before deleting
    const habit = await Habit.findOneAndDelete({ _id: id, userId: (session.user as any).id });

    if (!habit) {
        return NextResponse.json({ error: "Habit not found or unauthorized" }, { status: 404 });
    }

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
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id, status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Habit ID missing" }, { status: 400 });
    }

    // Ensure habit belongs to user
    const habit = await Habit.findOne({ _id: id, userId: (session.user as any).id });
    if (!habit) {
      return NextResponse.json({ error: "Habit not found or unauthorized" }, { status: 404 });
    }

    // update status
    habit.status = status;
    await habit.save();

    return NextResponse.json({ message: "Habit updated", habit });
  } catch (err) {
    console.error("PUT /api/Habits error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
