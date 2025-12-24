import { connectDB } from "../../lib/db/db";
import User from "../../lib/models/User.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Wrong password!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}