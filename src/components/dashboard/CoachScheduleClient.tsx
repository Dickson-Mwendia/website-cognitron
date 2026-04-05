'use client'

import { useState, useMemo } from 'react'
import type { CoachSession } from '@/types'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const trackConfig: Record<string, { icon: string; label: string; color: string }> = {
  coding: { icon: '💻', label: 'Coding', color: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', color: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', color: '#d4a843' },
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8) // 8am-7pm

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatWeekLabel(weekStart: Date): string {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 5)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  return `${weekStart.toLocaleDateString('en-GB', opts)} — ${weekEnd.toLocaleDateString('en-GB', opts)}`
}

interface Props {
  sessions: CoachSession[]
}

export function CoachScheduleClient({ sessions }: Props) {
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = useMemo(() => {
    const start = getWeekStart(new Date())
    start.setDate(start.getDate() + weekOffset * 7)
    return start
  }, [weekOffset])

  // Availability state (toggleable time slots)
  const [availability, setAvailability] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    DAYS.forEach((day) => {
      HOURS.forEach((hour) => {
        // Default: available Mon-Fri 9am-5pm
        init[`${day}-${hour}`] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) && hour >= 9 && hour < 17
      })
    })
    return init
  })

  const [showAvailability, setShowAvailability] = useState(false)

  const weekSessions = useMemo(() => {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    return sessions.filter((s) => {
      const sessionDate = new Date(s.date)
      return sessionDate >= weekStart && sessionDate <= weekEnd && s.status !== 'cancelled'
    })
  }, [sessions, weekStart])

  // Map sessions to grid
  const sessionGrid = useMemo(() => {
    const grid: Record<string, CoachSession[]> = {}
    weekSessions.forEach((s) => {
      const sessionDate = new Date(s.date)
      const dayIndex = (sessionDate.getDay() + 6) % 7 // Mon=0
      if (dayIndex >= 6) return // Skip Sunday
      const day = DAYS[dayIndex]
      const hour = parseInt(s.time.split(':')[0])
      const key = `${day}-${hour}`
      if (!grid[key]) grid[key] = []
      grid[key].push(s)
    })
    return grid
  }, [weekSessions])

  const toggleAvailability = (key: string) => {
    setAvailability((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w - 1)}
          className="rounded-xl border border-gray-200 p-2 text-[#0c1b33]/60 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33]">
            {formatWeekLabel(weekStart)}
          </h2>
          {weekOffset !== 0 && (
            <button
              type="button"
              onClick={() => setWeekOffset(0)}
              className="text-xs text-[#2a9d8f] hover:underline mt-0.5"
            >
              Back to this week
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w + 1)}
          className="rounded-xl border border-gray-200 p-2 text-[#0c1b33]/60 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="min-w-[800px]">
          {/* Day headers */}
          <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-gray-100">
            <div className="p-3" />
            {DAYS.map((day, i) => {
              const date = new Date(weekStart)
              date.setDate(date.getDate() + i)
              const isToday = new Date().toDateString() === date.toDateString()
              return (
                <div
                  key={day}
                  className={`p-3 text-center border-l border-gray-100 ${isToday ? 'bg-[#2a9d8f]/5' : ''}`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isToday ? 'text-[#2a9d8f]' : 'text-[#0c1b33]/50'}`}>
                    {day}
                  </p>
                  <p className={`text-lg font-bold ${isToday ? 'text-[#2a9d8f]' : 'text-[#0c1b33]'}`}>
                    {date.getDate()}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-gray-50 last:border-b-0">
              <div className="p-2 text-right pr-3">
                <span className="text-xs text-[#0c1b33]/40 font-medium">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
              {DAYS.map((day) => {
                const key = `${day}-${hour}`
                const cellSessions = sessionGrid[key] || []
                return (
                  <div
                    key={key}
                    className="border-l border-gray-50 p-1 min-h-[60px] relative"
                  >
                    {cellSessions.map((s) => {
                      const track = trackConfig[s.track]
                      return (
                        <div
                          key={s.id}
                          className="rounded-lg p-2 text-xs mb-1 border transition-all hover:shadow-sm"
                          style={{
                            backgroundColor: `${track?.color}12`,
                            borderColor: `${track?.color}30`,
                          }}
                        >
                          <p className="font-semibold text-[#0c1b33] truncate">
                            {track?.icon} {s.studentName.split(' ')[0]}
                          </p>
                          <p className="text-[#0c1b33]/60 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {s.locationType === 'home' ? 'Home' : 'Online'} · {s.durationMinutes}m
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Set Availability Section */}
      <section>
        <button
          type="button"
          onClick={() => setShowAvailability(!showAvailability)}
          className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.98]"
        >
          {showAvailability ? 'Hide' : 'Set'} Availability
          {showAvailability ? <ChevronLeft className="w-4 h-4 rotate-90" /> : <ChevronRight className="w-4 h-4 rotate-90" />}
        </button>

        {showAvailability && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm text-[#0c1b33]/60 mb-4">
              Click a time slot to toggle your availability. Green = available, gray = unavailable.
            </p>
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-1 mb-2">
                <div />
                {DAYS.map((day) => (
                  <p key={day} className="text-center text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">
                    {day}
                  </p>
                ))}
              </div>
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-[80px_repeat(6,1fr)] gap-1 mb-1">
                  <span className="text-xs text-[#0c1b33]/40 text-right pr-2 flex items-center justify-end">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                  {DAYS.map((day) => {
                    const key = `${day}-${hour}`
                    const isAvailable = availability[key]
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleAvailability(key)}
                        className={`h-8 rounded-lg border text-xs font-medium transition-all ${
                          isAvailable
                            ? 'bg-[#2a9d8f]/15 border-[#2a9d8f]/30 text-[#2a9d8f] hover:bg-[#2a9d8f]/25'
                            : 'bg-gray-50 border-gray-200 text-[#0c1b33]/30 hover:bg-gray-100'
                        }`}
                      >
                        {isAvailable ? '✓' : '—'}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
