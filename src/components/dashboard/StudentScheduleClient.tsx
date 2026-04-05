'use client'

import { useState } from 'react'
import type { StudentScheduleSession } from '@/types'
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Video } from 'lucide-react'

const trackConfig: Record<string, { icon: string; label: string; color: string }> = {
  coding: { icon: '💻', label: 'Coding', color: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', color: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', color: '#d4a843' },
}

interface Props {
  upcoming: StudentScheduleSession[]
  past: StudentScheduleSession[]
}

export function StudentScheduleClient({ upcoming, past }: Props) {
  const [showPast, setShowPast] = useState(false)

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    const dayStr = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
    if (diff === 0) return `Today — ${dayStr}`
    if (diff === 1) return `Tomorrow — ${dayStr}`
    return dayStr
  }

  const renderSession = (session: StudentScheduleSession) => {
    const track = trackConfig[session.track]
    return (
      <div
        key={session.id}
        className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
      >
        <div className="flex items-start gap-4">
          {/* Track Icon */}
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: `${track?.color}15` }}
          >
            {track?.icon}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-[#0c1b33] group-hover:text-[#2a9d8f] transition-colors">
              {session.lessonName}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#0c1b33]/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(session.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {session.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {session.locationType === 'home' ? 'At Home' : 'Online'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: `${track?.color}15`, color: track?.color }}
              >
                {track?.icon} {track?.label}
              </span>
              <span className="text-xs text-[#0c1b33]/50">with {session.coachName}</span>
            </div>
          </div>

          {/* Action */}
          {!session.isPast && (
            <button
              type="button"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#2a9d8f] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 hover:shadow-md active:scale-[0.97]"
            >
              <Video className="w-3.5 h-3.5" />
              Join
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Upcoming Sessions
        </h2>
        {upcoming.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#2a9d8f]/30 bg-white p-8 text-center">
            <span className="text-4xl mb-3 block">📅</span>
            <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">
              No upcoming sessions
            </h3>
            <p className="text-[#0c1b33]/60 text-sm max-w-sm mx-auto">
              Your next sessions will appear here once they&apos;re scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(renderSession)}
          </div>
        )}
      </section>

      {/* Past Sessions */}
      <section>
        <button
          type="button"
          onClick={() => setShowPast(!showPast)}
          className="flex items-center gap-2 text-sm font-semibold text-[#0c1b33]/60 hover:text-[#0c1b33] transition-colors"
        >
          {showPast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Recent Sessions ({past.length})
        </button>

        {showPast && (
          <div className="space-y-3 mt-4">
            {past.map((session) => (
              <div
                key={session.id}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 opacity-75"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl opacity-60"
                    style={{ backgroundColor: `${trackConfig[session.track]?.color}10` }}
                  >
                    {trackConfig[session.track]?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-[#0c1b33]/70">{session.lessonName}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[#0c1b33]/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(session.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {session.time}
                      </span>
                      <span className="text-xs">
                        {trackConfig[session.track]?.icon} {trackConfig[session.track]?.label} · {session.coachName}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    ✓ Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
