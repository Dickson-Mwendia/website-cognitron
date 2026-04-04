'use client';

import { useEffect, useState } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = '#d4a843',
  trackColor = '#162d50',
  showPercentage = true,
  className = '',
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;
  const center = size / 2;

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimatedProgress(Math.min(100, Math.max(0, progress)));
    });
    return () => cancelAnimationFrame(timer);
  }, [progress]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      {showPercentage && (
        <span
          className="absolute font-bold text-white"
          style={{ fontSize: size * 0.22 }}
        >
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}
