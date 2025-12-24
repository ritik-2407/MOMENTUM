import Todo from "../models/Todo.model";
import { connectDB } from "../db/db";
import { promises as fs } from "fs";
import path from "path";


// simple JSON file to keep daily snapshots
const FILE_PATH = path.join(process.cwd(), "dailyTodoStats.json");


export async function snapshotDailyTodos() {
await connectDB();


// Create file if doesn't exist
try {
await fs.access(FILE_PATH);
} catch {
await fs.writeFile(FILE_PATH, JSON.stringify({}), "utf8");
}


const raw = await fs.readFile(FILE_PATH, "utf8");
const data = raw ? JSON.parse(raw) : {};


const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const todayKey = `${yyyy}-${mm}-${dd}`;


// If snapshot already created for today → return
if (data[todayKey]) return data;


// ONLY snapshot if time is after 2:59 AM
const hours = today.getHours();
const mins = today.getMinutes();
const canSnapshot = hours > 2 || (hours === 2 && mins >= 59);


if (!canSnapshot) return data;


const completedCount = await Todo.countDocuments({ status: true });


data[todayKey] = completedCount;
await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));


return data;
}