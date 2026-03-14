import { TimerSession } from "./components/TimerSession";

export default function ForgePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1800px] mx-auto min-h-screen font-sans selection:bg-white/20">
      
      {/* ── HEADER ── */}
      <div className="mt-22 mb-12 px-4 text-center ">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold tracking-tight text-white/90">
          Love the urgency
        </h1>
        
      </div>

      {/* ── THE FORGE GRID ── */}
      <div className="flex justify-center items-center w-full mt-8 md:mt-16">
        <div className="w-full max-w-xl px-2 sm:px-4">
          <TimerSession />
        </div>
      </div>
      
    </div>
  );
}
