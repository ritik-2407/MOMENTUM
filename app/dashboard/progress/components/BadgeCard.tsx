"use client";

interface BadgeCardProps {
  completedDays: number;
  className?: string;
}

const BADGE_MILESTONES = [
  5,10,20,30,50,75,100,250
];

export default function BadgeCard({ completedDays, className = "" }: BadgeCardProps) {
  return (
    <div className={`w-full pt-2  ${className}`}>
      <h1 className="text-gray-600">------------------------------------------------------------------------------------------------------------------------</h1>

      <div className="grid grid-cols-10 gap-4 mt-4">
        {BADGE_MILESTONES.map((milestone) => {
         const unlocked = completedDays >= milestone;

          return (
            <div
              key={milestone}
              className="flex flex-col items-center"
            >
              <img
                src={`/badges/animals/${milestone}.png`}
                alt={`${milestone} day badge`}
                className={`
                  object-contain transition-all duration-200
                  ${unlocked ? "opacity-100" : "opacity-20 grayscale"}
                `}
                style={{
                  width: 40,
                  height: 40,
                  transform: unlocked ? "scale(1)" : "scale(0.9)",
                }}
              />
              <p className={`
                  object-contain transition-all duration-200
                  ${unlocked ? " font-poppins opacity-100" : "font-poppins opacity-20 grayscale"}
                `}>{milestone}</p>

              
            </div>
          );
        })}
      </div>

      <h2 className="mt-5 font-poppins text-md text-center font-semibold text-neutral-300 mb-1 tracking-wide">
        B A D G E S
      </h2>
    </div>
  );
}
