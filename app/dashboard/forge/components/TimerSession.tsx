"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TimerSession() {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(25 * 60); // Default 25 minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [customMin, setCustomMin] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const presets = [
    { label: "15m", value: 15 * 60 },
    { label: "25m", value: 25 * 60 },
    { label: "50m", value: 50 * 60 },
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (isCompleted) {
      resetTimer();
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(duration);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handlePresetSelect = (val: number) => {
    setIsActive(false);
    setIsCompleted(false);
    setDuration(val);
    setTimeLeft(val);
    setShowCustomInput(false);
  };

  const handleCustomSet = (e: React.FormEvent) => {
    e.preventDefault();
    const min = parseInt(customMin);
    if (!isNaN(min) && min > 0) {
      const seconds = min * 60;
      setDuration(seconds);
      setTimeLeft(seconds);
      setShowCustomInput(false);
      setIsActive(false);
      setIsCompleted(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Progress percentage for the ring
  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  return (
    <div className="bg-black/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative blurred background orb */}
      <div className="" />

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto space-y-8">
        {/* Goal Input */}
        <div className="w-full space-y-2">
          
          <input
            type="text"
            placeholder="Enter the Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            disabled={isActive}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Timer Presets */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetSelect(preset.value)}
              disabled={isActive}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                duration === preset.value && !showCustomInput
                  ? "bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90"
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={() => setShowCustomInput(true)}
            disabled={isActive}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              showCustomInput || !presets.find(p => p.value === duration)
                ? "bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90"
            }`}
          >
            Custom
          </button>
        </div>

        {/* Custom Input Reveal */}
        <AnimatePresence>
          {showCustomInput && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2"
              onSubmit={handleCustomSet}
            >
              <input
                type="number"
                min="1"
                placeholder="Minutes"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-24 focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                Set
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Main Timer Display */}
        <div className="relative flex items-center justify-center w-44 h-44 mt-4">
          {/* Circular Progress Indicator */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="301.59" /* 2 * PI * r */
              strokeDashoffset={301.59 - (301.59 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" /> {/* Emerald 400 */}
                <stop offset="100%" stopColor="#059669" /> {/* Emerald 600 */}
              </linearGradient>
            </defs>
          </svg>

          {/* Time Text */}
          <div className="flex flex-col items-center">
            <span
              className={`text-2xl font-black tabular-nums tracking-tighter ${
                isCompleted ? "text-emerald-400" : "text-white"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-white/40 text-sm font-medium mt-2 uppercase tracking-widest">
              {isCompleted ? "Done" : isActive ? "Focusing" : "Paused"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isActive
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            }`}
          >
            {isActive ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : isCompleted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
          
          {/* Reset button */}
          <AnimatePresence>
            {(isActive || timeLeft < duration || isCompleted) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={resetTimer}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Timer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
