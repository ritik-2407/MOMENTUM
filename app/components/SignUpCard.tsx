"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

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
    }
  }

  return (
    <div
      className="absolute inset-0 z-10 min-h-screen 
        bg-[url('/bg4.jpg')] bg-cover bg-center 
        flex items-center justify-center p-6"
    >
      <div className="backdrop-blur-md bg-white/5 border border-white/20
          rounded-3xl p-10 w-full max-w-sm text-white shadow-xl">

        <h1 className="text-3xl font-semibold text-center mb-10">
          Create your account
        </h1>

        {!success && (
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
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold 
                shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              Sign Up
            </button>

            {error && (
              <p className="text-sm text-red-400 text-center mt-1">{error}</p>
            )}
          </form>
        )}

        {success && (
          <div className="flex flex-col items-center gap-6 py-5 text-center">
            <p className=" font-roboto text-lg ml-5 italic text-center text-green-500">Account created 🎉</p>

            <button
              onClick={() => router.push("/signIn")}
              className="px-6 py-2 rounded-lg border border-white/30
                hover:border-white hover:scale-105 
                transition-all backdrop-blur-md"
            >
              Go to Sign In
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
