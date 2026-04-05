'use client'

import { useState } from 'react'
import type { BillingData } from '@/types'
import { CreditCard, Calendar, AlertCircle, X, Smartphone } from 'lucide-react'

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: '✓ Paid' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: '🕐 Pending' },
  overdue: { bg: 'bg-red-100', text: 'text-red-700', label: '⚠ Overdue' },
}

interface Props {
  billing: BillingData
}

export function BillingClient({ billing }: Props) {
  const [showMpesa, setShowMpesa] = useState(false)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Current Plan */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-[#d4a843]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Current Plan</p>
          </div>
          <p className="text-lg font-bold text-[#0c1b33]">{billing.plan.planName}</p>
          <p className="text-sm text-[#0c1b33]/60 mt-1">
            {billing.plan.childrenEnrolled} children · {billing.plan.sessionsPerWeek} sessions/week
          </p>
          <p className="text-2xl font-bold text-[#d4a843] mt-2">
            KES {billing.plan.monthlyTotalKes.toLocaleString()}
            <span className="text-xs font-normal text-[#0c1b33]/40">/month</span>
          </p>
        </div>

        {/* Next Payment */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#2a9d8f]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Next Payment</p>
          </div>
          <p className="text-lg font-bold text-[#0c1b33]">
            {new Date(billing.nextPayment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
          </p>
          <p className="text-2xl font-bold text-[#2a9d8f] mt-2">
            KES {billing.nextPayment.amountKes.toLocaleString()}
          </p>
        </div>

        {/* Outstanding Balance */}
        {billing.outstandingBalanceKes > 0 && (
          <div className="rounded-2xl border border-[#e8614d]/30 bg-[#e8614d]/5 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-[#e8614d]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#e8614d]">Outstanding</p>
            </div>
            <p className="text-2xl font-bold text-[#e8614d]">
              KES {billing.outstandingBalanceKes.toLocaleString()}
            </p>
            <p className="text-xs text-[#e8614d]/70 mt-1">Please pay before the due date</p>
          </div>
        )}

        {/* Pay Button */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c1b33] to-[#162d50] p-5 shadow-sm flex flex-col justify-center items-center text-center">
          <Smartphone className="w-8 h-8 text-[#d4a843] mb-2" />
          <button
            type="button"
            onClick={() => setShowMpesa(true)}
            className="rounded-full bg-[#d4a843] px-6 py-2.5 text-sm font-semibold text-[#0c1b33] transition-all hover:bg-[#d4a843]/90 hover:shadow-md active:scale-[0.98]"
          >
            Pay via M-Pesa
          </button>
        </div>
      </div>

      {/* M-Pesa Modal */}
      {showMpesa && (
        <div className="rounded-2xl border border-[#2a9d8f]/30 bg-[#2a9d8f]/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-[#0c1b33]">Pay via M-Pesa</h3>
            <button type="button" onClick={() => setShowMpesa(false)} className="text-[#0c1b33]/40 hover:text-[#0c1b33]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-white p-4 border border-gray-200">
              <p className="text-sm text-[#0c1b33]/60 mb-1">Step 1</p>
              <p className="text-sm font-medium text-[#0c1b33]">Open M-Pesa on your phone and select <strong>Lipa na M-Pesa</strong></p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-gray-200">
              <p className="text-sm text-[#0c1b33]/60 mb-1">Step 2</p>
              <p className="text-sm font-medium text-[#0c1b33]">Select <strong>Pay Bill</strong> and enter business number: <strong className="text-[#2a9d8f]">247247</strong></p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-gray-200">
              <p className="text-sm text-[#0c1b33]/60 mb-1">Step 3</p>
              <p className="text-sm font-medium text-[#0c1b33]">Enter account number: <strong className="text-[#2a9d8f]">COGNITRON-{billing.plan.planName.toUpperCase().replace(/\s/g, '')}</strong></p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-gray-200">
              <p className="text-sm text-[#0c1b33]/60 mb-1">Step 4</p>
              <p className="text-sm font-medium text-[#0c1b33]">Enter amount: <strong className="text-[#2a9d8f]">KES {billing.nextPayment.amountKes.toLocaleString()}</strong></p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-gray-200">
              <p className="text-sm text-[#0c1b33]/60 mb-1">Step 5</p>
              <p className="text-sm font-medium text-[#0c1b33]">Enter your M-Pesa PIN and confirm</p>
            </div>
            <p className="text-xs text-[#0c1b33]/50 mt-2">
              Your payment will be confirmed within 24 hours. Contact us on WhatsApp if you need help.
            </p>
          </div>
        </div>
      )}

      {/* Payment History */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Payment History
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">M-Pesa Ref</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {billing.payments.map((payment) => {
                const style = statusStyles[payment.status]
                return (
                  <tr key={payment.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-[#0c1b33]">
                      {new Date(payment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#0c1b33]">
                      KES {payment.amountKes.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[#0c1b33]/60 font-mono text-xs">
                      {payment.mpesaRef || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${style?.bg} ${style?.text}`}>
                        {style?.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
