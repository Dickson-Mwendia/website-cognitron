import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { mockParentConversations } from '@/lib/mock-data'
import { ParentMessagesClient } from '@/components/dashboard/ParentMessagesClient'

export const metadata: Metadata = {
  title: 'Messages | Cognitron',
}

export default async function MessagesPage() {
  await requireRole(['parent'])

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Messages
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Communicate directly with your children&apos;s coaches.
        </p>
      </div>

      <ParentMessagesClient conversations={mockParentConversations} />
    </div>
  )
}
