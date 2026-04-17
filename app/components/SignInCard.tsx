"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function SignInCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
       router.push("/dashboard/todos");
       router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Navigation */}
      <nav className="absolute top-0 inset-x-0 h-20 px-6 flex items-center z-50">
        <Link href="/" className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xl">←</span>
          <span className="font-poppins font-semibold tracking-wider">Back</span>
        </Link>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-10 w-full max-w-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="flex justify-center mb-6">
          <img src="/favicon.ico" alt="logo" className="w-12 h-12" />
        </div>

        <h1 className="text-3xl font-poppins font-bold text-center mb-2">
          Welcome back
        </h1>
        <p className="text-center text-white/40 mb-8 text-sm"></p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 block">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                focus:border-white/30 focus:bg-white/10 outline-none transition-all
                placeholder-white/20 text-white"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 block">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                focus:border-white/30 focus:bg-white/10 outline-none transition-all
                placeholder-white/20 text-white"
              placeholder="••••••••"
            />

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 text-center mt-3">{error}</motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 rounded-xl bg-white text-black font-semibold
              shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex flex-col items-center gap-4 mt-6">
          <Link
            href="/trollPage"
            className="text-xs text-white/40 hover:text-white transition"
          >
            Forgot password?
          </Link>
          <div className="text-xs text-white/40">
            Don't have an account? <Link href="/signUp" className="text-white hover:underline">Sign up</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
