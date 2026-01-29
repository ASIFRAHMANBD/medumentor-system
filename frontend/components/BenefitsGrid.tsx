function IconStethoscope() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-deep">
      <path d="M6 4v6a4 4 0 0 0 8 0V4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17 17v2a3 3 0 0 1-3 3h-2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconMicroscope() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-deep">
      <path d="M9 4l2 2-2 2-2-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 6l4 4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14h8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 18h12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconClipboard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-deep">
      <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 8h6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 16h6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconHeart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-deep">
      <path d="M12 20s-6-3.5-8-7 1-7 4-7 4 3 4 3 2-3 5-3 6 3 4 7-9 7-9 7z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export function BenefitsGrid() {
  const benefits = [
    { title: 'Clinically-structured curriculum', desc: 'Stage-based paths aligned to medical disciplines.', icon: IconStethoscope },
    { title: 'Lab-grade learning materials', desc: 'Evidence-backed videos, notes, and exam banks.', icon: IconMicroscope },
    { title: 'Assessment-first progress', desc: 'MCQ, Written, Viva with chapter-level tracking.', icon: IconClipboard },
    { title: 'Study with sustainable pace', desc: 'Reduce cognitive load with calm UI and rhythm.', icon: IconHeart },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {benefits.map((b) => {
        const Icon = b.icon
        return (
          <div key={b.title} className="bg-white border border-zinc-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Icon />
              <div>
                <div className="font-medium text-brand-base">{b.title}</div>
                <p className="text-zinc-700 mt-1">{b.desc}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
