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

    // Past 10 days (today inclusive)
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 9);
    tenDaysAgo.setHours(0, 0, 0, 0);

    // Initialize the last 10 days with 0
    const history: Record<string, number> = {};
    for (let i = 9; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      history[`${yyyy}-${mm}-${dd}`] = 0;
    }

    // Fetch completed todos in the window
    const completedTodos = await Todo.find(
      {
        userId,
        status: true,
        updatedAt: { $gte: tenDaysAgo },
      },
      { updatedAt: 1, _id: 0 }
    )
      .sort({ updatedAt: -1 })
      .lean();

    // Group by date
    completedTodos.forEach((todo: any) => {
      const d = new Date(todo.updatedAt);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;
      if (history[dateKey] !== undefined) {
        history[dateKey]++;
      }
    });

    return NextResponse.json({ history });
  } catch (err) {
    console.error("/api/todo-stats error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
