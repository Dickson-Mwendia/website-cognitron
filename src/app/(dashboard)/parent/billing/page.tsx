import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { mockBillingData } from '@/lib/mock-data'
import { BillingClient } from '@/components/dashboard/BillingClient'

export const metadata: Metadata = {
  title: 'Billing & Payments | Cognitron',
}

export default async function BillingPage() {
  await requireRole(['parent'])

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Billing & Payments
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Manage your subscription, view payment history, and pay via M-Pesa.
        </p>
      </div>

      <BillingClient billing={mockBillingData} />
    </div>
  )
}
