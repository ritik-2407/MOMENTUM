"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
       router.push("/dashboard/todos");
       router.refresh();
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
        bg-[url('/bg.jpg')] bg-cover bg-center p-6 text-white"
    >
      <div className="backdrop-blur-md bg-white/5 border border-white/20 
          rounded-3xl p-10 w-full max-w-sm shadow-xl">

        <h1 className="text-3xl font-semibold text-center mb-10">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm opacity-70 mb-1 block">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              autoFocus
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 
                focus:border-white focus:ring-0 outline-none transition-all
                placeholder-white/40"
              placeholder="your username"
            />
          </div>

          <div>
            <label className="text-sm opacity-70 mb-1 block">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 
                focus:border-white focus:ring-0 outline-none transition-all
                placeholder-white/40"
              placeholder="••••••••"
            />

            {error && (
              <p className="text-sm text-red-400 text-center mt-3">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-semibold
              shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <Link
            href="/trollPage"
            className="text-sm opacity-70 hover:opacity-100 transition"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
