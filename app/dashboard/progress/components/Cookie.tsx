"use client";

import { useState } from "react";
import Image from "next/image";

export default function CookieToggle() {
  const [eaten, setEaten] = useState(false);

  return (
    <button
      onClick={() => setEaten((prev) => !prev)}
      className="transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer relative w-8 h-8"
    >
      <Image
        src={eaten ? "/icons/eaten-cookie.png" : "/icons/cookie.png"}
        alt="cookie"
        fill
        className="select-none object-contain"
      />
    </button>
  );
}
