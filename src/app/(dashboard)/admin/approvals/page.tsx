import { requireRole } from '@/lib/auth'
import ApprovalsClient from './approvals-client'

export const metadata = { title: 'Approvals' }

export default async function ApprovalsPage() {
  await requireRole(['admin'])
  return <ApprovalsClient />
}

