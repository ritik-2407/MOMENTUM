"use client";

const QUOTES: string[] = [
  "Dreams are the blueprint; action is the architect.",
  "Hard work compounds the quiet confidence that greatness needs.",
  "Small daily improvements lead to massive long-term results.",
  "You don’t find time for your goals — you create it.",
  "Discipline beats motivation every single day.",
  "If your dreams don’t scare you, they’re not big enough.",
  "Consistency is the real flex.",
];

export default function QuotationCard() {
  // generate a stable quote every day (not on every refresh)
  const index = Math.floor(Date.now() / 86400000) % QUOTES.length;
  const quote = QUOTES[index];

  return (
      <div className="   flex flex-col items-center p-4 rounded-2xl bg-black/10 backdrop-blur-xl border border-white/20 w-100 h-30">
        <img src= '/icons/book.png' alt={`book icon`} className="w-10 h-10  pt-0 mt-0 mb-2 " />
      <p className=" italic  text-center text-md text-white/60 leading-6">
        “{quote}”
      </p>
    </div>
  );
}
