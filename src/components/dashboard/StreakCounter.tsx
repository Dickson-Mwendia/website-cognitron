interface StreakCounterProps {
  streak: number;
  days?: Array<{ day: string; active: boolean }>;
  className?: string;
}

export function StreakCounter({
  streak,
  days,
  className = '',
}: StreakCounterProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Streak headline */}
      <div className="flex items-center gap-1.5">
        <span className="text-2xl" role="img" aria-label="fire">
          🔥
        </span>
        <span className="text-lg font-bold text-white">
          {streak}-day streak
        </span>
      </div>

      {/* 7-day row */}
      {days && days.length > 0 && (
        <div className="flex items-center gap-1.5">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
                  d.active
                    ? 'bg-gold text-navy'
                    : 'border-2 border-dashed border-slate text-slate'
                }`}
              >
                {d.active ? '✓' : ''}
              </div>
              <span className="text-[10px] text-slate-light">{d.day}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
