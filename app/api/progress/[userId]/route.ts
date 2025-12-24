import mongoose from "mongoose"
import { connectDB } from "../../../lib/db/db";
import Progress from "../../../lib/models/progress.model";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
     const progress = await Progress.findOne({
      userId: process.env.USER_ID
    });
    return NextResponse.json(progress);
  } catch (err) {
    console.error("Progress GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
