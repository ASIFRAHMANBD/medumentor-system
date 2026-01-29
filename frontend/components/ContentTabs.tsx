'use client'
import { useState } from 'react'

export function ContentTabs() {
  const [tab, setTab] = useState<'video'|'notes'|'mcq'>('video')
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {['video','notes','mcq'].map(t => (
          <button key={t} onClick={() => setTab(t as any)} className={`px-3 py-1.5 rounded-lg border ${tab===t?'bg-accent text-white border-accent':'border-zinc-200 text-zinc-700'}`}>{t.toUpperCase()}</button>
        ))}
      </div>
      {tab==='video' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6">Video player</div>
      )}
      {tab==='notes' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6">PDF notes</div>
      )}
      {tab==='mcq' && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6">MCQ exam</div>
      )}
    </div>
  )
}