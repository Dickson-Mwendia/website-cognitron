'use client'

import { useState, useMemo } from 'react'
import type { CoachNoteEntry, TrackName } from '@/types'
import { Search, Filter, Plus, X, ChevronDown, ChevronUp } from 'lucide-react'

const trackConfig: Record<string, { icon: string; label: string; color: string }> = {
  coding: { icon: '💻', label: 'Coding', color: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', color: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', color: '#d4a843' },
}

interface Props {
  notes: CoachNoteEntry[]
  studentNames: string[]
}

export function CoachNotesLibraryClient({ notes: initialNotes, studentNames }: Props) {
  const [notes] = useState(initialNotes)
  const [search, setSearch] = useState('')
  const [studentFilter, setStudentFilter] = useState<string>('all')
  const [trackFilter, setTrackFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNote, setNewNote] = useState({ student: '', track: 'coding' as TrackName, content: '' })

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (studentFilter !== 'all' && n.studentName !== studentFilter) return false
      if (trackFilter !== 'all' && n.track !== trackFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          n.studentName.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.track.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [notes, search, studentFilter, trackFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [filtered])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0c1b33]/40" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0c1b33] placeholder:text-[#0c1b33]/40 outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0c1b33]/40" />
          <select
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors cursor-pointer"
          >
            <option value="all">All Students</option>
            {studentNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors cursor-pointer"
        >
          <option value="all">All Tracks</option>
          <option value="coding">💻 Coding</option>
          <option value="ai">🤖 AI</option>
          <option value="chess">♟️ Chess</option>
        </select>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2a9d8f] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="rounded-2xl border border-[#2a9d8f]/30 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-[#0c1b33]">New Note</h3>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-[#0c1b33]/40 hover:text-[#0c1b33]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              value={newNote.student}
              onChange={(e) => setNewNote({ ...newNote, student: e.target.value })}
              className="rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20"
            >
              <option value="">Select student...</option>
              {studentNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <select
              value={newNote.track}
              onChange={(e) => setNewNote({ ...newNote, track: e.target.value as TrackName })}
              className="rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20"
            >
              <option value="coding">💻 Coding</option>
              <option value="ai">🤖 AI</option>
              <option value="chess">♟️ Chess</option>
            </select>
          </div>
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Write your coaching notes..."
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-[#0c1b33] leading-relaxed focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 focus:outline-none resize-y"
          />
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="rounded-full bg-[#2a9d8f] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 active:scale-[0.97]"
            >
              Save Note
            </button>
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setNewNote({ student: '', track: 'coding', content: '' }) }}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-[#0c1b33]/60 transition-all hover:bg-gray-50 active:scale-[0.97]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-[#0c1b33]/50">
        {sorted.length} note{sorted.length !== 1 ? 's' : ''} found
      </p>

      {/* Notes Cards */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#0c1b33]/15 bg-white p-8 text-center">
            <span className="text-4xl mb-3 block">📝</span>
            <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">No notes found</h3>
            <p className="text-[#0c1b33]/60 text-sm max-w-sm mx-auto">
              Try adjusting your filters or add a new note.
            </p>
          </div>
        ) : (
          sorted.map((note) => {
            const track = trackConfig[note.track]
            const isExpanded = expandedId === note.id
            const formattedDate = new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

            return (
              <div
                key={note.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-300"
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : note.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-sm font-semibold text-white">
                        {note.studentName.split(' ').map((w) => w[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0c1b33]">{note.studentName}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ backgroundColor: `${track?.color}15`, color: track?.color }}
                          >
                            {track?.icon} {track?.label}
                          </span>
                          <span className="text-xs text-[#0c1b33]/40">{formattedDate}</span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#0c1b33]/40 shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#0c1b33]/40 shrink-0 mt-1" />
                    )}
                  </div>

                  {!isExpanded && (
                    <p className="mt-3 text-sm text-[#0c1b33]/60 line-clamp-2">
                      {note.content}
                    </p>
                  )}
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm leading-relaxed text-[#0c1b33]/80">
                      {note.content}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
