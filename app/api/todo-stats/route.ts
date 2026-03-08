import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Todo from "../../lib/models/Todo.model";
import { connectDB } from "../../lib/db/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    // @ts-ignore
    const userId = session.user.id;

    // Get the start of the day 6 days ago (so 7 days total including today)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Get all completed todos for this user in the last 7 days
    const completedTodos = await Todo.find({
      userId: userId,
      status: true,
      updatedAt: { $gte: sevenDaysAgo }
    });

    // Group by date (YYYY-MM-DD)
    const history: Record<string, number> = {};
    
    // Initialize last 7 days with 0 so the graph always has exactly 7 bars
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      history[`${yyyy}-${mm}-${dd}`] = 0;
    }

    // Populate actual counts from the database
    completedTodos.forEach(todo => {
      const d = new Date(todo.updatedAt);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;
      
      if (history[dateKey] !== undefined) {
        history[dateKey]++;
      }
    });

    // Today's live count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const liveCount = await Todo.countDocuments({ 
      userId: userId, 
      status: true, 
      updatedAt: { $gte: today } 
    });

    return NextResponse.json({ history, todayCompleted: liveCount });
  } catch (err) {
    console.error("/api/todo-stats error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

