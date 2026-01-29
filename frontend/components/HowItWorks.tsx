export function HowItWorks({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const container = variant === 'dark' 
    ? 'frosted-card p-6 border border-white/10' 
    : 'bg-white border border-zinc-100 rounded-xl p-6 shadow-sm'
  
  const arrow = variant === 'dark' ? 'text-zinc-500' : 'text-zinc-300'
  
  const steps = [
    { label: 'Learning Stage', style: 'bg-brand-base text-white border-brand-base' },
    { label: 'Subject', style: 'bg-brand-deep text-white border-brand-deep' },
    { label: 'Module', style: 'bg-brand-secondary text-white border-brand-secondary' },
    { label: 'Chapter', style: 'bg-brand-primary text-white border-brand-primary' },
  ]

  return (
    <div className={container}>
      <div className="flex flex-wrap items-center gap-3 font-medium">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full border text-sm shadow-sm transition-transform hover:scale-105 ${step.style}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <span className={arrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
