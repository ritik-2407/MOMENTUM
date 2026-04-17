"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("done");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
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
          Create Account
        </h1>
        <p className="text-center text-white/40 mb-8 text-sm"></p>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="flex flex-col gap-5"
            >
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
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 block">Set Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    focus:border-white/30 focus:bg-white/10 outline-none transition-all
                    placeholder-white/20 text-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 rounded-xl bg-white text-black font-semibold
                  shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isLoading ? "Creating..." : "Sign Up"}
              </button>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 text-center mt-1">{error}</motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 py-5 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <span className="text-2xl">🎉</span>
              </div>
              <p className="font-poppins text-lg font-medium text-emerald-400">Account created!</p>

              <button
                onClick={() => router.push("/signIn")}
                className="w-full py-3 rounded-xl bg-white/10 border border-white/20
                  hover:bg-white/20 transition-all font-medium"
              >
                Go to Sign In
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <div className="flex justify-center mt-6">
            <div className="text-xs text-white/40">
              Already have an account? <Link href="/signIn" className="text-white hover:underline">Sign in</Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
