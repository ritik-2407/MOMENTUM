import { NextResponse } from "next/server";
import { snapshotDailyTodos } from "../../lib/utils/snapshotDailyTodos";
import Todo from "../../lib/models/Todo.model";
import { connectDB } from "../../lib/db/db";


export async function GET() {
try {
await connectDB();


// TRIGGER SNAPSHOT CHECK
const stats = await snapshotDailyTodos();


// Also return today's live count for immediate UI updates
const liveCount = await Todo.countDocuments({ status: true });


return NextResponse.json({ history: stats, todayCompleted: liveCount });
} catch (err) {
console.error("/api/todo-stats error", err);
return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}

