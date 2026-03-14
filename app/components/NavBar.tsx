"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// --- Magnetic Wrapper Component ---
function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    
    // Calculate distance from center of the element
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Apply a dampening factor (0.2) so it doesn't fly too far away
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1 
      }}
    >
      {children}
    </motion.div>
  );
}

// --- Main Navbar Component ---
export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Progress", href: "/dashboard/progress" },
    { label: "Todo", href: "/dashboard/todos" },
    { label: "Forge", href: "/dashboard/forge" },
  ];

  return (
    <nav
      className="
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 p-2
        rounded-full
        bg-white/5 backdrop-blur-2xl
        border border-white/[0.08]
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      "
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <MagneticItem key={item.href}>
            <Link
              href={item.href}
              className={`
                relative px-5 py-2 rounded-full
                flex items-center justify-center
                text-sm  font-medium transition-colors duration-300
                ${isActive ? "text-white" : "text-white/60 hover:text-white/90"}
              `}
            >
              {/* Apple-style sliding pill background for active state */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              
              <span className="relative z-10">{item.label}</span>
            </Link>
          </MagneticItem>
        );
      })}
    </nav>
  );
}