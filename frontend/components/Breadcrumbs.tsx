export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-zinc-600">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? <a href={item.href} className="hover:text-zinc-800">{item.label}</a> : <span>{item.label}</span>}
            {i < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}