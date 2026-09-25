import { getSubmissions } from './actions'
import SupportClient from './SupportClient'

export const dynamic = 'force-dynamic'

export default async function SupportPage() {
  const submissions = await getSubmissions()
  const unreadCount = submissions.filter((s) => !s.is_read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Support Messages
          {unreadCount > 0 && (
            <span className="ml-3 align-middle text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {unreadCount} unread
            </span>
          )}
        </h2>
      </div>

      <SupportClient initialSubmissions={submissions} />
    </div>
  )
}
