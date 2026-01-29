function IconCompass() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-800">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l4-1-1 4-3-3z" fill="currentColor"/>
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-800">
      <path d="M12 4l7 3v5c0 5-7 8-7 8s-7-3-7-8V7l7-3z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-800">
      <path d="M5 16h14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 16V9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 16V6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 16v-4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export function FeatureList() {
  const features = [
    { title: 'Guided medical pathways', desc: 'Disciplines aligned: Anatomy, Physiology, Microbiology, and more.', icon: IconCompass },
    { title: 'Quality and trust', desc: 'Calm UI, accessible design, and reliable performance.', icon: IconShield },
    { title: 'Measurable progress', desc: 'MCQ, Written, Viva with rigorous tracking and analytics.', icon: IconChart },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map(f => {
        const Icon = f.icon
        return (
          <div key={f.title} className="bg-white border border-zinc-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-zinc-800"><Icon /></div>
              <div>
                <div className="font-medium">{f.title}</div>
                <div className="text-zinc-700 mt-1">{f.desc}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}