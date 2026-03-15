"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKS = [
  {
    id: "lofi",
    label: "Lofi Beats",
    url: "https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9cf17d23f-4.mp3", // Placeholder safe audio
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><path d="m9 9 12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    )
  },
  {
    id: "rain",
    label: "Rain",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=heavy-rain-nature-sounds-8186.mp3", // Free rain ambient
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><path d="M16 20v-2"/><path d="M8 20v-2"/><path d="M12 22v-2"/></svg>
    )
  },
  {
    id: "white-noise",
    label: "White Noise",
    url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_511d7fc40f.mp3?filename=white-noise-8117.mp3", // Free white noise
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2.5"/><path d="M15.5 4H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2.5"/><path d="M8.5 12H15.5"/><path d="M12 8v8"/></svg>
    )
  }
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(TRACKS[0].id);
  const [volume, setVolume] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = TRACKS.find(t => t.id === activeTrackId);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrackId]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (id: string) => {
    setActiveTrackId(id);
    setIsPlaying(true);
  };

  return (
    <div className="relative z-20 mt-8">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={activeTrack?.url}
        loop
      />

      {/* Main Container */}
      <div className="bg-black/5 border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col items-center gap-4 w-full max-w-sm mx-auto transition-all duration-300">
        
        {/* Header / Active Info */}
        <div className="w-full flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${isPlaying ? 'text-emerald-400' : 'text-white/60'}`}>
              {activeTrack?.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm leading-tight">{activeTrack?.label}</span>
              <span className="text-white/40 text-xs">{isPlaying ? 'Playing...' : 'Paused'}</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-between w-full px-2 gap-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>

          {/* Volume Slider */}
          <div className="flex-1 flex items-center gap-2 group">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/60 transition-colors"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>

        {/* Expanded UI: Track Selector */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <span className="text-xs text-white/40 uppercase tracking-wider font-semibold px-2 mb-1">Soundscapes</span>
                {TRACKS.map(track => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackChange(track.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      activeTrackId === track.id 
                        ? 'bg-white/10 text-white border border-white/5' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={activeTrackId === track.id ? 'text-emerald-400' : ''}>
                      {track.icon}
                    </div>
                    <span className="text-sm font-medium">{track.label}</span>
                    {activeTrackId === track.id && isPlaying && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto flex items-end gap-0.5 h-3"
                      >
                        <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-emerald-400 rounded-full" />
                        <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-emerald-400 rounded-full" />
                        <motion.div animate={{ height: ["50%", "100%", "50%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-emerald-400 rounded-full" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
