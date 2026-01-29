export function StatsBar() {
  const stats = [
    { label: 'Hours of content', value: '120+' },
    { label: 'Structured modules', value: '45' },
    { label: 'Practice exams', value: '30+' },
  ]
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map(s => (
        <div key={s.label} className="surface soft-shadow p-5">
          <div className="text-2xl font-semibold text-zinc-900">{s.value}</div>
          <div className="text-zinc-600">{s.label}</div>
        </div>
      ))}
    </div>
  )
}