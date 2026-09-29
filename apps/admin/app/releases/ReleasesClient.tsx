'use client'

import { useState, useTransition } from 'react'
import { setCurrentRelease, updateReleaseNotes } from './actions'
import { CheckCircle2, Pencil, Save, X } from 'lucide-react'

type Release = {
  id: string
  version: string
  build: number | null
  released_at: string
  notes: string[]
  dmg_path: string
  sha256: string
  size_bytes: number
  is_current: boolean
}

export default function ReleasesClient({ releases: initial }: { releases: Release[] }) {
  const [releases, setReleases] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftNotes, setDraftNotes] = useState('')

  const makeCurrent = (id: string) => {
    if (!confirm('Point the app updater at this version? Every Mac that checks for updates will be offered this build next.')) return
    startTransition(async () => {
      await setCurrentRelease(id)
      setReleases((prev) => prev.map((r) => ({ ...r, is_current: r.id === id })))
    })
  }

  const startEdit = (release: Release) => {
    setEditingId(release.id)
    setDraftNotes(release.notes.join('\n'))
  }

  const saveNotes = (id: string) => {
    const notes = draftNotes.split('\n').map((n) => n.trim()).filter(Boolean)
    startTransition(async () => {
      await updateReleaseNotes(id, notes)
      setReleases((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)))
      setEditingId(null)
    })
  }

  if (releases.length === 0) {
    return (
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 text-center text-gray-500">
        No releases yet — the next <code>./release.sh</code> run in the app repo will add one here.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {releases.map((r) => (
        <div key={r.id} className={`bg-white/[0.03] border rounded-2xl p-6 ${r.is_current ? 'border-purple-500/40' : 'border-white/5'}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Version {r.version}</h3>
                {r.is_current && (
                  <span className="flex items-center gap-1 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Current
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {r.released_at} · {(r.size_bytes / 1_048_576).toFixed(1)} MB · build {r.build ?? '—'} · sha256 {r.sha256.slice(0, 12)}…
              </p>
            </div>
            {!r.is_current && (
              <button
                onClick={() => makeCurrent(r.id)}
                disabled={isPending}
                className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition-colors"
              >
                Make current
              </button>
            )}
          </div>

          {editingId === r.id ? (
            <div className="mt-4 space-y-2">
              <textarea
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                rows={4}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50"
                placeholder="One note per line"
              />
              <div className="flex gap-2">
                <button onClick={() => saveNotes(r.id)} disabled={isPending} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white">
                  <Save className="w-4 h-4" /> Save
                </button>
                <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <ul className="space-y-1.5 text-sm text-gray-300">
                {r.notes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-400">•</span> {n}
                  </li>
                ))}
              </ul>
              <button onClick={() => startEdit(r)} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-300 mt-3">
                <Pencil className="w-3.5 h-3.5" /> Edit notes
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
