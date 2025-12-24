import { connectDB } from "../../lib/db/db";
import { NextResponse } from "next/server";
import Todo from "../../lib/models/Todo.model";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { todo, tier } = await req.json();

    if (!todo) {
      return NextResponse.json({ error: "Todo cannot be empty" }, { status: 400 });
    }

    const newTodo = await Todo.create({ todo, tier });
    return NextResponse.json({ message: "Todo created successfully", todo: newTodo }, { status: 201 });
  } 
catch (err) {
  console.error("POST /api/todos error:", err);
  const message = err instanceof Error ? err.message : String(err) || "Server error";
  return NextResponse.json({ error: message }, { status: 500 });
}
};


export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json({ todos }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
        await connectDB();
        
        const data = await req.json();
        const id = data.id;
        await Todo.findByIdAndDelete(id);
        return NextResponse.json({message: "Todo deleted successfully"}, {status: 200});
    } catch (err) {
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, status, userId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Todo ID missing" }, { status: 400 });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const prev = todo.status;

    // update status
    todo.status = status;
    await todo.save();

    // STREAK UPDATE HERE 
    if (prev === false && status === true) {
      // call your util
      const { updateStreak } = await import("../../lib/utils/updateStreak");
      await updateStreak(userId);
    }

    return NextResponse.json({ message: "Todo updated", todo });
  } catch (err) {
    console.error("PUT /api/todos error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
