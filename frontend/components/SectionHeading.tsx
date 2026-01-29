export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-2 h-1 w-14 rounded bg-brand-primary" aria-hidden="true"></div>
      {subtitle && <p className="mt-3 text-zinc-700 max-w-2xl">{subtitle}</p>}
    </div>
  )
}