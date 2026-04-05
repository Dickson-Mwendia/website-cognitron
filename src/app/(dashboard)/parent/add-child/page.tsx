import { requireRole } from '@/lib/auth'
import AddChildClient from './add-child-client'

export const metadata = { title: 'Add a Child | Cognitron' }

export default async function AddChildPage() {
  await requireRole(['parent'])
  return <AddChildClient />
}

