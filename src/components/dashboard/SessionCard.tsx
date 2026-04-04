import { Calendar, Clock } from 'lucide-react';

interface SessionCardProps {
  trackName: string;
  lessonName: string;
  coachName: string;
  scheduledAt: string;
  locationType: 'home' | 'online';
  durationMinutes: number;
  variant?: 'hero' | 'compact';
  className?: string;
}

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
};

const locationLabels: Record<string, string> = {
  home: '🏠 At home',
  online: '💻 Online',
};

function formatSessionDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const timeStr = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (diffDays < 0) return `Past · ${timeStr}`;
  if (diffDays === 0) return `Today · ${timeStr}`;
  if (diffDays === 1) return `Tomorrow · ${timeStr}`;
  if (diffDays < 7) {
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    return `${dayName} · ${timeStr}`;
  }

  return `${date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })} · ${timeStr}`;
}

export function SessionCard({
  trackName,
  lessonName,
  coachName,
  scheduledAt,
  locationType,
  durationMinutes,
  variant = 'hero',
  className = '',
}: SessionCardProps) {
  const icon = trackIcons[trackName.toLowerCase()] ?? '📚';

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl bg-navy-light p-3 transition-all hover:bg-navy-light/90 hover:shadow-sm ${className}`}
      >
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {lessonName}
          </p>
          <p className="text-xs text-slate-light">
            {coachName} · {formatSessionDate(scheduledAt)}
          </p>
        </div>
        <span className="text-xs text-slate-light whitespace-nowrap">
          {durationMinutes}m
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-navy p-6 ${className}`}
    >
      {/* Gold shimmer accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top right, #d4a843 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Track + location badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-navy-light text-gold px-2 py-0.5 rounded-full">
            {icon} {trackName}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-light bg-navy-light px-2 py-0.5 rounded-full">
            {locationLabels[locationType] ?? locationType}
          </span>
        </div>

        {/* Lesson title */}
        <h3 className="text-xl font-heading font-bold text-white mb-1">
          {lessonName}
        </h3>

        {/* Coach */}
        <p className="text-sm text-slate-light mb-4">with {coachName}</p>

        {/* Date / time / duration */}
        <div className="flex items-center gap-4 text-sm text-slate-light mb-5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatSessionDate(scheduledAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {durationMinutes} min
          </span>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          Join session
        </button>
      </div>
    </div>
  );
}
