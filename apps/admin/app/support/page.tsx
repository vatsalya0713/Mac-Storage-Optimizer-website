import { getSubmissions } from './actions'
import SupportClient from './SupportClient'
import { AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SupportPage() {
  const { submissions, tableMissing } = await getSubmissions()
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

      {tableMissing ? (
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-200">Database not set up yet</p>
            <p className="text-sm text-amber-200/70 mt-1">
              The <code className="text-amber-300">contact_submissions</code> table doesn't exist yet. Run{' '}
              <code className="text-amber-300">supabase/schema.sql</code> once in the Supabase SQL Editor, then
              refresh this page.
            </p>
          </div>
        </div>
      ) : (
        <SupportClient initialSubmissions={submissions} />
      )}
    </div>
  )
}
