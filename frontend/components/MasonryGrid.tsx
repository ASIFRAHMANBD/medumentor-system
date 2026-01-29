export type MasonryItem = { title: string; subtitle: string; href: string }

export function MasonryGrid({ items }: { items: MasonryItem[] }) {
  return (
    <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-4">
      {items.map((it) => (
        <a key={it.title} href={it.href} className="group mb-6 block break-inside-avoid">
            <div className="relative surface soft-shadow overflow-hidden">
            <div className="aspect-[4/3] bg-zinc-100" aria-hidden="true"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white">
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="text-lg font-medium">{it.title}</div>
                <div className="text-sm text-zinc-300">{it.subtitle}</div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}