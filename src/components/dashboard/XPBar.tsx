'use client';

import { useEffect, useState } from 'react';

interface XPBarProps {
  current: number;
  max: number;
  currentLevelName?: string;
  nextLevelName?: string;
  className?: string;
}

export function XPBar({
  current,
  max,
  currentLevelName,
  nextLevelName,
  className = '',
}: XPBarProps) {
  const [animated, setAnimated] = useState(false);
  const percent = Math.min(100, Math.max(0, (current / max) * 100));

  useEffect(() => {
    const timer = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const formatNumber = (n: number) => n.toLocaleString();

  return (
    <div className={`w-full ${className}`}>
      {/* Level labels */}
      {(currentLevelName || nextLevelName) && (
        <div className="flex items-center justify-between mb-1.5">
          {currentLevelName && (
            <span className="text-xs font-semibold text-gold flex items-center gap-1">
              ⭐ {currentLevelName}
            </span>
          )}
          {nextLevelName && (
            <span className="text-xs text-slate-light flex items-center gap-1">
              🔒 {nextLevelName}
            </span>
          )}
        </div>
      )}

      {/* Bar */}
      <div className="relative h-3 rounded-full bg-navy-light overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: animated ? `${percent}%` : '0%',
            transition: 'width 1s ease-out',
            background: 'linear-gradient(90deg, #b08a2e, #d4a843, #e8c96e)',
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'xpShimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* XP text */}
      <p className="text-xs text-slate-light mt-1.5 text-center">
        {formatNumber(current)} / {formatNumber(max)} XP
      </p>

      <style jsx>{`
        @keyframes xpShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
