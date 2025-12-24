"use client";

import { useState } from "react";

export default function CookieToggle() {
  const [eaten, setEaten] = useState(false);

  return (
    <button
      onClick={() => setEaten(prev => !prev)}
      className="transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <img
        src={eaten ? "/icons/eaten-cookie.png" : "/icons/cookie.png"}
        alt="cookie"
        className="w-8 h-8 select-none"
      />
    </button>
  );
}
