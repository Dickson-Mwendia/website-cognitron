import { ProgressRing } from './ProgressRing';

interface TrackCardProps {
  trackName: 'coding' | 'ai' | 'chess';
  currentLevel: number;
  currentLevelName: string;
  progressPercent: number;
  xpThisWeek?: number;
  className?: string;
}

const trackConfig = {
  coding: { icon: '💻', label: 'Coding', accent: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', accent: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', accent: '#d4a843' },
} as const;

export function TrackCard({
  trackName,
  currentLevel,
  currentLevelName,
  progressPercent,
  xpThisWeek,
  className = '',
}: TrackCardProps) {
  const config = trackConfig[trackName];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-navy-light p-5 ${className}`}
    >
      {/* Accent glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15 pointer-events-none"
        style={{ background: config.accent }}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* Left: info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{config.icon}</span>
            <h3 className="text-lg font-heading font-bold text-white">
              {config.label}
            </h3>
          </div>

          {/* Level badge */}
          <span
            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
            style={{
              backgroundColor: `${config.accent}20`,
              color: config.accent,
            }}
          >
            Level {currentLevel} · {currentLevelName}
          </span>

          {/* XP this week */}
          {xpThisWeek != null && xpThisWeek > 0 && (
            <p className="text-xs text-gold font-semibold">
              +{xpThisWeek.toLocaleString()} XP this week
            </p>
          )}
        </div>

        {/* Right: progress ring */}
        <ProgressRing
          progress={progressPercent}
          size={64}
          strokeWidth={5}
          color={config.accent}
        />
      </div>
    </div>
  );
}
