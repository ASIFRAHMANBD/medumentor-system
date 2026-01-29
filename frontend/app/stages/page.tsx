export default function StagesPage() {
  const stages = [
    { slug: 'beginner', name: "Beginner's Journey" },
    { slug: 'expert', name: 'Becoming Expert' },
  ]
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Learning Stages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stages.map(s => (
          <a key={s.slug} href={`/stage/${s.slug}`} className="bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300">
            <div className="text-lg font-medium">{s.name}</div>
            <div className="text-zinc-600">Structured path to mastery</div>
          </a>
        ))}
      </div>
    </div>
  )
}