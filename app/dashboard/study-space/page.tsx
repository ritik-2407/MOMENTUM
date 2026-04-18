import { TimerSession } from "./components/TimerSession";
import { MusicCard } from "./components/MusicCard";
import Image from "next/image";

export default function StudySpacePage() {
  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-white/20">
      {/* ── BACKGROUND GIF (Full Screen) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/study-bg.png"
          alt="Cozy Study Space Background"
          fill
          className="object-cover opacity-80"
          unoptimized // To allow direct urls or local files without extra optimization overhead
        />
        {/* Dark subtle overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/40 "></div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1800px] mx-auto min-h-[100dvh] lg:min-h-screen flex flex-col items-center pt-28 pb-8 sm:pt-32 sm:pb-12">
        
        {/* ── LEFT CENTER WIDGET ── */}
        <div className="w-full w-[95%] sm:max-w-xl lg:max-w-xl px-2 sm:px-4 lg:mx-14 mx-auto flex flex-col flex-1 justify-between">
          
          <div className="w-full mt-4 sm:mt-20">
            <TimerSession />
          </div>
          
          <div className="w-full mt-auto pt-10">
            <MusicCard />
          </div>

        </div>
      </div>
    </div>
  );
}
