export function LogosStripe({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const logos = ['Acuity', 'Lumina', 'Veritas', 'Forma', 'Arc']
  const container = variant === 'dark' ? 'mt-12 border-t border-white/10 pt-6 flex flex-wrap items-center gap-8' : 'mt-12 border-t border-zinc-200 pt-6 flex flex-wrap items-center gap-8'
  const item = variant === 'dark' ? 'text-white/70' : 'text-zinc-500'
  return (
    <div className={container}>
      {logos.map(l => (
        <div key={l} className={item}>{l}</div>
      ))}
    </div>
  )
}