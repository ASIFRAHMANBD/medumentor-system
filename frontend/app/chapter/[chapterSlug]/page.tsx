import { ContentTabs } from '@/components/ContentTabs'

export default function ChapterPage({ params }: { params: { chapterSlug: string } }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">{params.chapterSlug}</h2>
      <ContentTabs />
    </div>
  )
}