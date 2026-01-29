export function CTASection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-200 p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Ready to start your journey?</div>
            <div className="text-zinc-700 mt-2">Choose a stage and begin learning with structured confidence.</div>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <a href="/stages" className="rounded-lg bg-accent px-4 py-2 text-white">Start Learning</a>
            <a href="/subject/anatomy" className="rounded-lg border border-zinc-300 px-4 py-2">Browse Programs</a>
          </div>
        </div>
      </div>
    </section>
  )
}