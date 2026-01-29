import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function SubjectPage({ params }: { params: { subjectSlug: string } }) {
  const modules = [
    { slug: 'thorax', name: 'Thorax' },
    { slug: 'neuro', name: 'Neuro Anatomy' },
  ]
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: 'Stages', href: '/stages' }, { label: params.subjectSlug }]} />
      <h2 className="text-2xl font-semibold mb-6">{params.subjectSlug}</h2>
      <div className="space-y-3">
        {modules.map(m => (
          <a key={m.slug} href={`/module/${m.slug}`} className="block bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300">
            <div className="text-lg font-medium">{m.name}</div>
          </a>
        ))}
      </div>
    </div>
  )
}