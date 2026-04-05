'use client'

import { useState, useMemo } from 'react'
import type { CoachSession } from '@/types'
import { Search, Filter, ChevronDown, ChevronUp, MapPin, Clock, User, BookOpen } from 'lucide-react'

const trackConfig: Record<string, { icon: string; label: string; color: string }> = {
  coding: { icon: '💻', label: 'Coding', color: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', color: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', color: '#d4a843' },
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Scheduled' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
}

interface Props {
  sessions: CoachSession[]
}

export function CoachSessionsClient({ sessions }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [trackFilter, setTrackFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false
      if (trackFilter !== 'all' && s.track !== trackFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          s.studentName.toLowerCase().includes(q) ||
          s.track.toLowerCase().includes(q) ||
          s.date.includes(q)
        )
      }
      return true
    })
  }, [sessions, search, statusFilter, trackFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })
  }, [filtered])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0c1b33]/40" />
          <input
            type="text"
            placeholder="Search by student, track, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0c1b33] placeholder:text-[#0c1b33]/40 outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0c1b33]/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0c1b33]/40" />
          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors cursor-pointer"
          >
            <option value="all">All Tracks</option>
            <option value="coding">💻 Coding</option>
            <option value="ai">🤖 AI</option>
            <option value="chess">♟️ Chess</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#0c1b33]/50">
        Showing {sorted.length} of {sessions.length} sessions
      </p>

      {/* Sessions Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Time</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Track</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-[#0c1b33]/40">
                  No sessions match your filters.
                </td>
              </tr>
            ) : (
              sorted.map((session) => {
                const track = trackConfig[session.track]
                const status = statusStyles[session.status]
                const isExpanded = expandedId === session.id
                const formattedDate = new Date(session.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

                return (
                  <tr key={session.id} className="group">
                    <td colSpan={8} className="p-0">
                      <div
                        className="flex items-center px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50/50"
                        onClick={() => setExpandedId(isExpanded ? null : session.id)}
                      >
                        <span className="w-[100px] text-sm text-[#0c1b33]">{formattedDate}</span>
                        <span className="w-[70px] text-sm text-[#0c1b33]/70">{session.time}</span>
                        <span className="w-[160px] flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#0c1b33]/40" />
                          <span className="text-sm font-medium text-[#0c1b33] truncate">{session.studentName}</span>
                        </span>
                        <span className="w-[100px]">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{ backgroundColor: `${track?.color}15`, color: track?.color }}
                          >
                            {track?.icon} {track?.label}
                          </span>
                        </span>
                        <span className="w-[100px]">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${status?.bg} ${status?.text}`}>
                            {status?.label}
                          </span>
                        </span>
                        <span className="w-[90px] flex items-center gap-1 text-sm text-[#0c1b33]/60">
                          <MapPin className="w-3.5 h-3.5" />
                          {session.locationType === 'home' ? 'Home' : 'Online'}
                        </span>
                        <span className="w-[80px] flex items-center gap-1 text-sm text-[#0c1b33]/60">
                          <Clock className="w-3.5 h-3.5" />
                          {session.durationMinutes}m
                        </span>
                        <span className="ml-auto">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#0c1b33]/40" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#0c1b33]/40" />
                          )}
                        </span>
                      </div>
                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="rounded-xl bg-[#f8f7f4] p-4 space-y-3">
                            {session.notes ? (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50 mb-1">Session Notes</p>
                                <p className="text-sm leading-relaxed text-[#0c1b33]/80">{session.notes}</p>
                              </div>
                            ) : (
                              <p className="text-sm text-[#0c1b33]/40 italic">No notes for this session yet.</p>
                            )}
                            {session.studentProgress && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50 mb-1">Student Progress</p>
                                <p className="text-sm leading-relaxed text-[#0c1b33]/80">{session.studentProgress}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
