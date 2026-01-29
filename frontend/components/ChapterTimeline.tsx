export function ChapterTimeline({ chapters }: { chapters: { slug: string; name: string }[] }) {
  return (
    <ol className="relative border-l border-zinc-200">
      {chapters.map(c => (
        <li key={c.slug} className="ml-4 mb-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent"></div>
          <a href={`/chapter/${c.slug}`} className="block bg-white border border-zinc-200 rounded-xl px-4 py-3">
            <div className="font-medium">{c.name}</div>
          </a>
        </li>
      ))}
    </ol>
  )
}