import Link from "next/link";

export default function Page() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      
      <div className="max-w-xl flex flex-col gap-8">
        
        <h1 className="text-4xl font-semibold text-gray-300 leading-snug">
          Our team saw your request and collectively decided to <br />
          <span className="text-white">take a nap instead.</span>
        </h1>

        <p className="text-xl text-gray-500">
          They’re asking for a raise, but honestly…  
          <br />
          we’re still paying them in ham-burgers.
        </p>

        <p className="text-lg text-gray-400">
          Try using those two brain cells.  
          <span className="block mt-1 text-gray-600">
            (We believe in you. Kinda.)
          </span>
        </p>

        <Link
          href="/signIn"
          className="mx-auto mt-4 px-8 py-3 rounded-xl bg-white text-black 
          font-medium border border-white/10 shadow-md
          transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Fine, take me back
        </Link>
      </div>
    </div>
  );
}
