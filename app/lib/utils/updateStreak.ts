import Progress from "../models/progress.model";
import { getStreakDay } from "./getStreakDay";

export async function updateStreak(userId: string) {
  const todayBucket = getStreakDay(); //defines the current day

  let progress = await Progress.findOne({ userId });

  if (!progress) {
    progress = await Progress.create({
      userId,
      streak: 1,
      lastUpdated: todayBucket,
      completedDays: [{ date: todayBucket }],
    });

    return progress;
  }

  const last = progress.lastUpdated ? new Date(progress.lastUpdated) : null;

  if (last && last.getTime() === todayBucket.getTime()) {
    return progress;
  }

  const yesterdayBucket = new Date(todayBucket);
  yesterdayBucket.setDate(todayBucket.getDate() - 1);

  if (
    last &&
    last.getFullYear() === yesterdayBucket.getFullYear() &&
    last.getMonth() === yesterdayBucket.getMonth() &&
    last.getDate() === yesterdayBucket.getDate()
  ) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastUpdated = todayBucket;

  //to avoid duplicates

  const exists = progress.completedDays.some((d : any ) => new Date(d.date).getTime() === todayBucket.getTime());

  if(!exists) {
    progress.completedDays.push({date: todayBucket});

  }

  await progress.save();
  return progress;
}
