"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const tracks = [
  { label: "Lo-Fi", src: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
  
];

export function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [status, setStatus] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const buildAudio = useCallback(
    (src: string, shouldPlay: boolean) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      const audio = new Audio();
      audio.loop = true;
      audio.volume = volume;
      audio.crossOrigin = "anonymous";
      audio.src = src;
      audio.load();

      audio.addEventListener("error", () => setStatus("Couldn't load track"));

      if (shouldPlay) {
        audio.addEventListener(
          "canplay",
          () => {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                setStatus("");
              })
              .catch(() => {
                setIsPlaying(false);
                setStatus("Tap play to start");
              });
          },
          { once: true }
        );
      }

      audioRef.current = audio;
    },
    [volume]
  );

  useEffect(() => {
    buildAudio(tracks[0].src, false);
    return () => {
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.readyState >= 2) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setStatus("");
          })
          .catch(() => setStatus("Tap play to start"));
      } else {
        audio.load();
        audio.addEventListener(
          "canplay",
          () => {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                setStatus("");
              })
              .catch(() => setStatus("Tap play to start"));
          },
          { once: true }
        );
      }
    }
  };

  const selectTrack = (i: number) => {
    if (i === currentIdx) return;
    setCurrentIdx(i);
    buildAudio(tracks[i].src, isPlaying);
    if (!isPlaying) setIsPlaying(false);
  };

  return (
    <div className="bg-black/5 border border-white/10 rounded-3xl p-4 sm:p-5 relative overflow-hidden">
      {/* Decorative spacer similar to timer */}
      <div className="" />

      <div className="relative z-10 flex flex-col items-center mx-auto space-y-3">
        
        {/* Track selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          {tracks.map((t, i) => (
            <button
              key={t.label}
              onClick={() => selectTrack(i)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                i === currentIdx
                  ? "bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Controls row */}
        <div className="flex w-full items-center justify-between gap-3 sm:gap-4 mt-1">
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 z-10 ${
              isPlaying
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            }`}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>

          {/* Waveform indicator */}
          <div className="flex-1 h-1.5 bg-black/20 border border-white/5 rounded-full overflow-hidden relative mx-2">
            {isPlaying && (
              <div
                className="absolute inset-y-0 w-[40%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  animation: "slide 1.4s linear infinite",
                }}
              />
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-[100px] sm:w-[130px] flex-shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 text-white/40"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1.5 bg-transparent rounded-full appearance-none cursor-pointer outline-none w-full"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.8) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
              }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 text-white/40"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </div>
        </div>

        {/* Status message */}
        {status && (
          <p className="text-center text-[10px] sm:text-xs text-white/30 uppercase tracking-widest mt-1">{status}</p>
        )}
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
}