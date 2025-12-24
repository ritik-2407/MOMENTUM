"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();

      const isPM = hours >= 12;
      hours = hours % 12 || 12; // convert 0 -> 12

      const formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${isPM ? "PM" : "AM"}`;

      setTime(formatted);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
