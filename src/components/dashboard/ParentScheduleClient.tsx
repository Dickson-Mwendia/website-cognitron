'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react'

interface FamilySession {
  id: string
  childName: string
  track: string
  coachName: string
  date: string
  time: string
  locationType: 'home' | 'online'
  durationMinutes: number
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8)

const childColors: Record<string, { bg: string; border: string; text: string }> = {
  Amara: { bg: 'bg-[#2a9d8f]/12', border: 'border-[#2a9d8f]/30', text: 'text-[#2a9d8f]' },
  Jabari: { bg: 'bg-[#e8614d]/12', border: 'border-[#e8614d]/30', text: 'text-[#e8614d]' },
}

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

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
  sessions: FamilySession[]
}

export function ParentScheduleClient({ sessions }: Props) {
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = useMemo(() => {
    const start = getWeekStart(new Date())
    start.setDate(start.getDate() + weekOffset * 7)
    return start
  }, [weekOffset])

  const weekSessions = useMemo(() => {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    return sessions.filter((s) => {
      const d = new Date(s.date)
      return d >= weekStart && d <= weekEnd
    })
  }, [sessions, weekStart])

  const sessionGrid = useMemo(() => {
    const grid: Record<string, FamilySession[]> = {}
    weekSessions.forEach((s) => {
      const d = new Date(s.date)
      const dayIndex = (d.getDay() + 6) % 7
      if (dayIndex >= 6) return
      const day = DAYS[dayIndex]
      const hour = parseInt(s.time.split(':')[0])
      const key = `${day}-${hour}`
      if (!grid[key]) grid[key] = []
      grid[key].push(s)
    })
    return grid
  }, [weekSessions])

  // Legend — unique child names
  const childNames = [...new Set(sessions.map((s) => s.childName))]

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#0c1b33]/50 font-medium">Color by child:</span>
        {childNames.map((name) => {
          const colors = childColors[name] || { bg: 'bg-gray-100', text: 'text-gray-600' }
          return (
            <span key={name} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
              {name}
            </span>
          )
        })}
      </div>

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
            <button type="button" onClick={() => setWeekOffset(0)} className="text-xs text-[#2a9d8f] hover:underline mt-0.5">
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
                <div key={day} className={`p-3 text-center border-l border-gray-100 ${isToday ? 'bg-[#d4a843]/5' : ''}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isToday ? 'text-[#d4a843]' : 'text-[#0c1b33]/50'}`}>{day}</p>
                  <p className={`text-lg font-bold ${isToday ? 'text-[#d4a843]' : 'text-[#0c1b33]'}`}>{date.getDate()}</p>
                </div>
              )
            })}
          </div>

          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-gray-50 last:border-b-0">
              <div className="p-2 text-right pr-3">
                <span className="text-xs text-[#0c1b33]/40 font-medium">{hour.toString().padStart(2, '0')}:00</span>
              </div>
              {DAYS.map((day) => {
                const key = `${day}-${hour}`
                const cellSessions = sessionGrid[key] || []
                return (
                  <div key={key} className="border-l border-gray-50 p-1 min-h-[60px]">
                    {cellSessions.map((s) => {
                      const colors = childColors[s.childName] || { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-700' }
                      return (
                        <div key={s.id} className={`rounded-lg p-2 text-xs mb-1 border transition-all hover:shadow-sm ${colors.bg} ${colors.border}`}>
                          <p className={`font-semibold truncate ${colors.text}`}>
                            {trackIcons[s.track]} {s.childName}
                          </p>
                          <p className="text-[#0c1b33]/50 truncate flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 shrink-0" />
                            {s.time} · {s.durationMinutes}m
                          </p>
                          <p className="text-[#0c1b33]/50 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {s.coachName} · {s.locationType === 'home' ? 'Home' : 'Online'}
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
    </div>
  )
}
