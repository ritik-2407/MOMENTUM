"use client";

export default function ProgressLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-22">
        <div className="lg:col-span-1 h-full min-h-[320px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />
        <div className="lg:col-span-1 h-full min-h-[320px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />
        <div className="md:col-span-2 lg:col-span-2 rounded-2xl p-6 animate-pulse bg-white/5 border border-white/10 h-full min-h-[320px]" />
        <div className="md:col-span-2 lg:col-span-3 min-w-0 animate-pulse bg-white/5 rounded-2xl border border-white/10 h-[250px]" />
        <div className="md:col-span-2 lg:col-span-1 w-full h-full min-h-[350px] animate-pulse bg-white/5 rounded-2xl border border-white/10" />
      </div>
    </div>
  );
}
