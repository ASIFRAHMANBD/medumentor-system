export default function StagePage({ params }: { params: { stageSlug: string } }) {
  const subjects = [
    { slug: 'anatomy', name: 'Anatomy' },
    { slug: 'physiology', name: 'Physiology' },
  ]
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{params.stageSlug}</h2>
        <a className="text-zinc-700" href="/stages">Back</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map(s => (
          <a key={s.slug} href={`/subject/${s.slug}`} className="bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300">
            <div className="text-lg font-medium">{s.name}</div>
            <div className="text-zinc-600">Core concepts and modules</div>
          </a>
        ))}
      </div>
    </div>
  )
}