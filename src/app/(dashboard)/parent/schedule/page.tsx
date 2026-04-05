import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { mockCoachSessions } from '@/lib/mock-data'
import { ParentScheduleClient } from '@/components/dashboard/ParentScheduleClient'

export const metadata: Metadata = {
  title: 'Family Schedule | Cognitron',
}

export default async function ParentSchedulePage() {
  await requireRole(['parent'])

  // Map coach sessions to family sessions — showing sessions for the parent's children
  const familySessions = mockCoachSessions
    .filter((s) => s.status !== 'cancelled')
    .map((s) => ({
      id: s.id,
      childName: s.studentName.split(' ')[0], // First name only
      track: s.track,
      coachName: `Coach ${s.studentName.includes('Okonkwo') ? 'David' : 'Sarah'}`,
      date: s.date,
      time: s.time,
      locationType: s.locationType,
      durationMinutes: s.durationMinutes,
    }))
    .filter((s) => ['Amara', 'Jabari'].includes(s.childName))

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Family Schedule
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          All your children&apos;s upcoming sessions in one view.
        </p>
      </div>

      <ParentScheduleClient sessions={familySessions} />
    </div>
  )
}
