"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white min-h-screen pt-24 px-4">
      {/* HERO */}
      <div className="flex flex-col items-center">
        <h1 className="font-poppins flex items-center mb-3 text-5xl">
          <img
            className="w-12 h-12 mr-3"
            src="/favicon.ico"
            alt="logo"
          />
          MOMENTUM
        </h1>

        <p className="text-gray-300 mb-16 text-lg">
          We train your monkey brain better than you train your biceps.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex gap-6 mb-24">
          <Link
            href="/signIn"
            className="transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]
              bg-white text-black rounded-lg px-8 py-2 border border-gray-200"
          >
            Sign In
          </Link>

          <Link
            href="/signUp"
            className="transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]
              border border-white/30 rounded-lg px-8 py-2"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* MOMENTUM PULSE DIVIDER */}
      <div className="w-full flex justify-center mb-28">
        <div className="h-0.5 w-90 bg-linear-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
      </div>

      {/* FEATURE CAPSULES */}
      <div className="max-w-4xl mx-auto mb-28 px-4">
        <h2 className="text-center text-3xl text-amber-50 mb-14 font-semibold">
          Why Momentum Doesn’t Feel Like Every Other “Productivity App”
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* CARD 1 */}
  <div className="border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
    <img
      src="/icons/tracking.png"
      alt="tracking icon"
      className="w-12 h-12 mx-auto mb-4 opacity-90"
    />
    <h3 className="text-xl text-white mb-3">Behavior Hacking</h3>
    <p className="text-gray-400 text-sm">
      Momentum uses psychology, not fake motivation.
      Your brain gets tricked into wanting to stay consistent.
    </p>
  </div>

  {/* CARD 2 */}
  <div className="border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
    <img
      src="/icons/ui.png"
      alt="ui icon"
      className="w-12 h-12 mx-auto mb-4 opacity-90"
    />
    <h3 className="text-xl text-white mb-3">Clean AF UI</h3>
    <p className="text-gray-400 text-sm">
      No clutter. Zero noise.
      Just you, your tasks, and an interface that keeps you honest.
    </p>
  </div>

  {/* CARD 3 */}
  <div className="border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
    <img
      src="/icons/fire.png"
      alt="fire icon"
      className="w-12 h-12 mx-auto mb-4 opacity-90"
    />
    <h3 className="text-xl text-white mb-3">Streak Power</h3>
    <p className="text-gray-400 text-sm">
      Your monkey brain HATES breaking streaks.
      We use that against you (for your own good).
    </p>
  </div>
</div>

      </div>

      {/* Q&A SECTIONS */}
      <div className="max-w-3xl mx-auto text-center text-gray-400 space-y-20">
        {/* Q1 */}
        <section>
          <h2 className="text-3xl text-amber-50 mb-4">What is MOMENTUM?</h2>
          <p>
            Not a cute checklist app.  
            Momentum is engineered to hijack the exact psychology you've used  
            to procrastinate your whole life — and flip it in your favor.
          </p>
        </section>

        {/* Q2 */}
        <section>
          <h2 className="text-3xl text-amber-50 mb-4">What’s special?</h2>
          <p>
            Minimal. Clean. Uncluttered.  
            Zero mental RAM wasted.  
            Everything pushes you toward action without feeling heavy.
          </p>
        </section>

        {/* Q3 */}
        <section>
          <h2 className="text-3xl text-amber-50 mb-4">Do you need it?</h2>
          <p>
            You’re literally scrolling a landing page  
            instead of doing your tasks.  
            <br />
            <span className="text-white">Take the hint bro.</span>
          </p>
        </section>

        {/* BACK TO TOP */}
        <div className="pb-20">
          <p className="text-xl mb-6">Still scrolling? Your tasks are crying.</p>
          <Link
  href="/"
  className="w-15 ml-85 bg-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]
    border border-white/40 rounded-md px-3 py-1 flex items-center justify-center"
>
  <img
    src="/icons/up.png"
    alt="back to top"
    className="w-6 h-6"
  />
</Link>

        </div>
      </div>
    </div>
  );
}
