"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Progress", href: "/dashboard/progress" },
    { label: "Todo", href: "/dashboard/todos" },
    { label: "Habits", href: "/dashboard/habits" },
  ];

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        flex items-center gap-10 px-10 py-3
        rounded-2xl
        bg-black/30 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_25px_rgba(0,0,0,0.32)]
        z-50
      "
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          

          <Link
            key={item.href}
            href={item.href}
            className="
              relative text-white font-poppins text-lg font-medium
              transition-all duration-300
              hover:text-white
              hover:drop-shadow-[0_0_6px_white]
              group
            "
          >
            {item.label}

            {/* Active tab highlight glowing circle */}
            {isActive && (
              <span
                className="
                  absolute -bottom-1 left-1/2 -translate-x-1/2
                  w-5 h-0.5 rounded-md bg-green-300
                  shadow-[0_0_8px_white]
                "
              />
            )}

            {/* Underline slide animation on hover */}
            <span
              className={`
                absolute -bottom-1 left-1/2 h-0.5 w-0 
                bg-white rounded-full transition-all duration-300 
                group-hover:w-3/4 group-hover:left-1/2 
              `}
              style={{ transform: "translateX(-50%)" }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
