"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is MOMENTUM?",
      answer:
        "Not a cute checklist app. Momentum hijacks the psychology of procrastination and flips it into a streak-driven engine.",
    },
    {
      question: "Why does it work?",
      answer:
        "Zero mental RAM wasted. We eliminate the noise so you only focus on execution.",
    },
    {
      question: "Do you really need it?",
      answer: "You're reading an FAQ instead of working. Take the hint.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 overflow-x-hidden font-sans">
      {/* 1. TOP NAV (Minimal) */}
      <nav className="fixed top-0 inset-x-0 h-15 px-6 flex items-center justify-between z-50 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/[0.05]">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110"
            src="/favicon.ico"
            alt="logo"
          />
          <span className="font-poppins font-bold text-xl tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
            MOMENTUM
          </span>
        </Link>
        <Link
          href="/signIn"
          className="text-sm font-medium px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          Sign In
        </Link>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-4 flex flex-col items-center justify-center min-h-[85vh]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 max-w-3xl"
        >
          <h1 className="font-poppins text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            Master your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              monkey brain.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A productivity system built on psychology and streak power. No
            noise, just execution. We train your brain better than you train
            your procrastination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signIn"
              className="relative group px-8 py-4 rounded-full bg-white text-black font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MOMENTUM PULSE DIVIDER */}
      <div className="w-full flex justify-center mb-32 opacity-20 relative">
        <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-white animate-pulse blur-[2px]" />
      </div>

      {/* 3. FEATURE BENTO GRID */}
      <section className="max-w-5xl mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            Why it actually works.
          </h2>
          <p className="text-white/40">
            Not just another checklist. An ecosystem designed to force
            consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-2 border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px] group-hover:bg-white/[0.06] transition-colors duration-500" />
            <img
              src="/icons/tracking.png"
              alt="tracking"
              className="w-10 h-10 mb-6 opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <h3 className="text-2xl font-semibold mb-3 font-poppins">
              Behavior Hacking
            </h3>
            <p className="text-white/40 max-w-md leading-relaxed">
              Momentum uses psychology, not fake motivation. Your brain gets
              tricked into wanting to stay consistent because breaking a streak
              hurts more than doing the work.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group"
          >
            <img
              src="/icons/ui.png"
              alt="ui"
              className="w-10 h-10 mb-6 opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <h3 className="text-xl font-semibold mb-3 font-poppins">
              Clean AF UI
            </h3>
            <p className="text-white/40 leading-relaxed text-sm">
              No clutter. Zero noise. Just you, your tasks, and an interface
              that keeps you completely honest.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group"
          >
            <img
              src="/icons/fire.png"
              alt="fire"
              className="w-10 h-10 mb-6 opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <h3 className="text-xl font-semibold mb-3 font-poppins">
              Streak Power
            </h3>
            <p className="text-white/40 leading-relaxed text-sm">
              Your monkey brain HATES breaking streaks. We weaponize that
              against you (for your own good).
            </p>
          </motion.div>

          {/* Card 4 (New) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-2 border border-white/10 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group flex items-end min-h-[220px]"
          >
            <div className="absolute -bottom-10 -right-10">
              <img
                src="/leagueIcons/animals/OUTLIER.WebP"
                alt="cookie"
                className="w-48 h-48 opacity-20 group-hover:opacity-40 transition-opacity blur-[2px] -rotate-12 group-hover:rotate-0 duration-700"
              />
            </div>
            <div className="relative z-10 w-full">
              <h3 className="text-2xl font-semibold mb-3 font-poppins">
                Leagues System
              </h3>
              <p className="text-white/40 max-w-md leading-relaxed">
                Rank up from Gold-fish to OUTLIER. Level Up on daily basis based
                on your consistency. This gamifies your productivity and makes
                it fun.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. INTERACTIVE FAQ */}
      <section className="max-w-3xl mx-auto px-4 mb-40">
        <h2 className="font-poppins text-3xl font-bold mb-10 text-center">
          In case you're still skeptical.
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.03]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-medium text-lg"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                  className="text-white/30"
                >
                  ↓
                </motion.span>
              </button>
              <AnimatePresence>
                {activeFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-white/50 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLOSING CTA */}
      <section className="relative px-4 pb-32 text-center">
        <h2 className="text-4xl md:text-5xl font-poppins font-black mb-6">
          Stop scrolling.
        </h2>
        <p className="text-xl text-white/40 mb-10">
          Time to Lock-in.
        </p>
        <Link
          href="/signUp"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 hover:border-white/40 transition-all duration-300 font-semibold"
        >
          Create Account Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center text-white/20 text-sm">
        <p>© {new Date().getFullYear()} Momentum. ritik-2407.</p>
      </footer>
    </div>
  );
}
