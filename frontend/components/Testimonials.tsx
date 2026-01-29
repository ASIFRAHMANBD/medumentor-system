export function Testimonials() {
  const items = [
    { quote: 'The structure helped me stay focused for hours.', author: 'Ayesha, Med Student' },
    { quote: 'Clear paths and calm UI — exactly what I needed.', author: 'Rahul, Resident' },
  ]
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What learners say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t) => (
            <figure key={t.author} className="surface soft-shadow p-6 hover-lift">
              <blockquote className="text-zinc-800">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-zinc-600">{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}