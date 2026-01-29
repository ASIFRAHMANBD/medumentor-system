import { ChapterTimeline } from '@/components/ChapterTimeline'
import { ModuleAccordion } from '@/components/ModuleAccordion'

export default function ModulePage({ params }: { params: { moduleSlug: string } }) {
  const chapters = [
    { slug: 'thorax-01', name: 'Thorax 01' },
    { slug: 'thorax-02', name: 'Thorax 02' },
  ]
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      <h2 className="text-2xl font-semibold">{params.moduleSlug}</h2>
      <ChapterTimeline chapters={chapters} />
      <ModuleAccordion modules={[{ title: 'Outline', items: chapters.map(c => c.name) }]} />
    </div>
  )
}