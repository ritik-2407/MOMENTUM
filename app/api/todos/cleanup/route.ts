import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Todo from "../../../lib/models/Todo.model";
import { connectDB } from "../../../lib/db/db";

// Deletes todo buckets older than 14 days for the authenticated user.
// Call this on app mount or via a cron job.
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 14);
    cutoff.setHours(0, 0, 0, 0);

    const result = await Todo.deleteMany({
      userId: (session.user as any).id,
      dayBucket: { $lt: cutoff },
    });

    return NextResponse.json(
      {
        message: "Cleanup complete",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Todo cleanup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
