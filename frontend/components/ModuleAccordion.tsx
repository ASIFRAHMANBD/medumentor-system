'use client'
import { useState } from 'react'

export function ModuleAccordion({ modules }: { modules: { title: string; items: string[] }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {modules.map((m, idx) => (
        <div key={idx} className="border border-zinc-200 rounded-xl bg-white">
          <button className="w-full px-4 py-3 text-left font-medium" onClick={() => setOpen(open === idx ? null : idx)}>
            {m.title}
          </button>
          {open === idx && (
            <div className="px-4 pb-4">
              <ul className="text-zinc-700">
                {m.items.map((it, i) => (
                  <li key={i} className="py-1">{it}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}