'use client';

import { useEffect, useState } from 'react';

interface XPBarProps {
  current: number;
  max: number;
  currentLevelName?: string;
  nextLevelName?: string;
  variant?: 'dark' | 'light';
  className?: string;
}

export function XPBar({
  current,
  max,
  currentLevelName,
  nextLevelName,
  variant = 'dark',
  className = '',
}: XPBarProps) {
  const [animated, setAnimated] = useState(false);
  const percent = Math.min(100, Math.max(0, (current / max) * 100));

  useEffect(() => {
    const timer = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const formatNumber = (n: number) => n.toLocaleString();

  const isDark = variant === 'dark';

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={max} aria-label={`${formatNumber(current)} of ${formatNumber(max)} XP`}>
      {/* Level labels */}
      {(currentLevelName || nextLevelName) && (
        <div className="flex items-center justify-between mb-1.5">
          {currentLevelName && (
            <span className={`text-xs font-semibold flex items-center gap-1 ${isDark ? 'text-gold' : 'text-gold-dark'}`}>
              ⭐ {currentLevelName}
            </span>
          )}
          {nextLevelName && (
            <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-light' : 'text-slate'}`}>
              🔒 {nextLevelName}
            </span>
          )}
        </div>
      )}

      {/* Bar */}
      <div className={`relative h-3 rounded-full overflow-hidden ${isDark ? 'bg-navy-light' : 'bg-gray-200'}`}>
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
      <p className={`text-xs mt-1.5 text-center ${isDark ? 'text-slate-light' : 'text-slate'}`}>
        {formatNumber(current)} / {formatNumber(max)} XP
      </p>
    </div>
  );
}
