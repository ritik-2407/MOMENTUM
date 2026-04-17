import { connectDB } from "../../../lib/db/db";
import Progress from "../../../lib/models/progress.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(_req: Request, props: { params: Promise<{ userId: string }> }) {
  try {
    const params = await props.params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).id !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const progress = await Progress.findOne({
      userId: (session.user as any).id,
    })
      .select({ streak: 1, completedDays: 1, _id: 0 })
      .lean();

    return NextResponse.json(
      progress ?? { streak: 0, completedDays: [] }
    );
  } catch (err) {
    console.error("Progress GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
