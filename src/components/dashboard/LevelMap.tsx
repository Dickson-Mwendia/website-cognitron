'use client';

import { useState } from 'react';
import { Check, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'not_started';
  score: number | null;
}

interface Module {
  id: string;
  name: string;
  moduleOrder: number;
  lessons: Lesson[];
}

interface Level {
  id: string;
  name: string;
  levelOrder: number;
  badgeEmoji: string;
  completed: boolean;
  modules: Module[];
}

interface LevelMapProps {
  levels: Level[];
  currentLevelOrder: number;
  className?: string;
}

function LessonNode({ lesson, isFuture }: { lesson: Lesson; isFuture: boolean }) {
  const isCompleted = lesson.status === 'completed';
  const isCurrent = lesson.status === 'in_progress';
  const isLocked = isFuture || lesson.status === 'not_started';

  return (
    <div className="flex items-center gap-3 group">
      {/* Node circle */}
      <div
        className={`relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
          isCompleted
            ? 'bg-gold border-gold text-navy'
            : isCurrent
              ? 'border-gold bg-navy-light text-gold animate-pulse'
              : 'border-slate/30 bg-navy-light/50 text-slate/40'
        }`}
      >
        {isCompleted ? (
          <Check className="w-4 h-4" strokeWidth={3} />
        ) : isLocked ? (
          <Lock className="w-3.5 h-3.5" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-gold" />
        )}
      </div>

      {/* Label */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium truncate ${
            isCompleted
              ? 'text-white'
              : isCurrent
                ? 'text-gold font-semibold'
                : 'text-slate/50'
          }`}
        >
          {lesson.name}
        </p>
        {isCompleted && lesson.score != null && (
          <p className="text-[10px] text-gold-dark">{lesson.score}% score</p>
        )}
      </div>
    </div>
  );
}

function ModuleSection({
  module,
  isFutureLevel,
}: {
  module: Module;
  isFutureLevel: boolean;
}) {
  return (
    <div className="ml-4 relative">
      {/* Module name */}
      <h4
        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
          isFutureLevel ? 'text-slate/40' : 'text-slate-light'
        }`}
      >
        {module.name}
      </h4>

      {/* Lessons with connector line */}
      <div className="relative pl-[18px]">
        {/* Vertical golden path */}
        <div
          className={`absolute left-[17px] top-0 bottom-0 w-0.5 ${
            isFutureLevel ? 'bg-slate/20' : 'bg-gold/30'
          }`}
        />

        <div className="space-y-3">
          {module.lessons.map((lesson) => (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              isFuture={isFutureLevel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LevelMap({
  levels,
  currentLevelOrder,
  className = '',
}: LevelMapProps) {
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(() => {
    const set = new Set<string>();
    for (const lvl of levels) {
      if (lvl.levelOrder === currentLevelOrder || lvl.levelOrder === currentLevelOrder - 1) {
        set.add(lvl.id);
      }
    }
    return set;
  });

  const toggleLevel = (id: string) => {
    setExpandedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sorted = [...levels].sort((a, b) => a.levelOrder - b.levelOrder);

  return (
    <div className={`space-y-0 ${className}`}>
      {sorted.map((level, idx) => {
        const isFuture = level.levelOrder > currentLevelOrder;
        const isCurrent = level.levelOrder === currentLevelOrder;
        const isExpanded = expandedLevels.has(level.id);

        return (
          <div key={level.id}>
            {/* Level gate divider */}
            {idx > 0 && (
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 h-px bg-gold/20" />
                <span className="text-lg">{level.badgeEmoji}</span>
                <div className="flex-1 h-px bg-gold/20" />
              </div>
            )}

            {/* Level header */}
            <button
              type="button"
              onClick={() => toggleLevel(level.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                isCurrent
                  ? 'bg-navy-light border border-gold/40'
                  : level.completed
                    ? 'bg-navy-light/60 border border-gold/10'
                    : 'bg-navy-light/30 border border-slate/10'
              }`}
            >
              <span className="text-2xl">{level.badgeEmoji}</span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-heading font-bold ${
                    isFuture ? 'text-slate/50' : 'text-white'
                  }`}
                >
                  Level {level.levelOrder}: {level.name}
                </h3>
                <p className="text-xs text-slate-light">
                  {level.completed
                    ? '✅ Completed'
                    : isCurrent
                      ? '🔥 In progress'
                      : '🔒 Locked'}
                </p>
              </div>
              <span
                className={`text-xs text-slate-light transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>

            {/* Expanded modules */}
            {isExpanded && (
              <div className="pt-3 pb-1 space-y-4">
                {[...level.modules]
                  .sort((a, b) => a.moduleOrder - b.moduleOrder)
                  .map((mod) => (
                    <ModuleSection
                      key={mod.id}
                      module={mod}
                      isFutureLevel={isFuture}
                    />
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
