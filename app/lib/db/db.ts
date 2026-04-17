import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING; // your fixed DB URL
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };
global.__mongooseCache = cached;

export async function connectDB(): Promise<void> {
  if (cached.conn || mongoose.connection.readyState === 1) return;

  try {
    if (!MONGO_URI) {
      throw new Error("MongoDB URI is missing. Please set it in db.ts");
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI, {
        dbName: "todo_app", // optional, but cleaner
      });
    }
    cached.conn = await cached.promise;

    console.log("🟢 MongoDB connected successfully");

  } catch (error: any) {
    console.error("🔴 MongoDB connection error");

    if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("❌ Invalid host or network issue. Check your MongoDB URL or internet.");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.error("❌ Cannot connect to MongoDB server. Is it running locally?");
    } else if (error.message.includes("authentication")) {
      console.error("❌ Authentication failed. Check username/password.");
    } else if (error.message.includes("timeout")) {
      console.error("❌ Connection timed out. Check network latency or server availability.");
    } else {
      console.error("❌ Unknown error:", error.message);
    }

    throw new Error("Failed to connect to MongoDB");
  }
}
