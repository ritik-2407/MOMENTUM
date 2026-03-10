"use client";

import { useEffect, useState } from "react";

interface QuoteResponse {
  quote: string;
  author: string;
}

export default function QuotationCard() {
  const [data, setData] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        // Fetch a random quote.
        // dummyjson.com/quotes is fast, reliable, and requires no auth.
        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error("Failed to fetch quote");
        const json = await res.json();
        setData({ quote: json.quote, author: json.author });
      } catch (err) {
        // Fallback if API fails
        setData({ 
          quote: "Dreams are the blueprint; action is the architect.", 
          author: "Momentum" 
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuote();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[200px] absolute inset-0 w-full h-full">
        <div className="animate-pulse flex flex-col items-center w-full">
          <div className="h-10 w-10 bg-white/5 rounded-lg mb-6"></div>
          <div className="h-4 bg-white/5 rounded-full w-3/4 mb-3"></div>
          <div className="h-4 bg-white/5 rounded-full w-5/6 mb-6"></div>
          <div className="h-3 bg-white/5 w-1/4 rounded-full self-end mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center md:items-start justify-center min-h-[20px] absolute inset-0 w-full h-full transition-all duration-500">
      
      {/* Icon */}
      <div className="mb-4">
        <img src="/icons/book.png" alt="book icon" className="w-8 h-8 opacity-80" />
      </div>

      {/* Quote */}
      <p className="italic text-center md:text-left text-[15px] sm:text-base text-white/80 leading-relaxed font-poppins relative">
        <span className="text-xl sm:text-2xl text-amber-500/50 absolute -top-2 -left-3 font-serif">"</span>
        {data?.quote}
        <span className="text-xl sm:text-2xl text-amber-500/50 absolute -top-2 -right-3 font-serif">"</span>
      </p>

      {/* Author */}
      <p className="w-full text-right mt-6 text-xs text-white/40 uppercase tracking-widest font-semibold">
        — {data?.author}
      </p>
    </div>
  );
}
