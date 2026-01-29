export function Footer() {
  return (
    <footer className="bg-brand-base border-t border-white/10 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div>
          <div className="inline-flex items-center rounded-md bg-white px-3 py-1">
            <span className="text-2xl font-semibold tracking-tight text-brand-base">Medu</span>
            <span className="text-2xl font-semibold tracking-tight text-brand-secondary">mentor</span>
          </div>
          <div className="mt-3 h-0.5 w-12 bg-brand-secondary" aria-hidden="true"></div>
          <p className="text-zinc-300 mt-3">Calm, structured learning for medical students.</p>
        </div>
        <div>
          <div className="font-medium text-white">Product</div>
          <div className="mt-2 h-0.5 w-8 bg-brand-deep" aria-hidden="true"></div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-brand-primary" href="/stages">Stages</a></li>
            <li><a className="hover:text-brand-primary" href="/subject/anatomy">Programs</a></li>
            <li><a className="hover:text-brand-primary" href="/module/thorax">Modules</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-white">Company</div>
          <div className="mt-2 h-0.5 w-8 bg-brand-deep" aria-hidden="true"></div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-brand-primary" href="#">About</a></li>
            <li><a className="hover:text-brand-primary" href="#">Contact</a></li>
            <li><a className="hover:text-brand-primary" href="#">Privacy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-white">Get started</div>
          <div className="mt-2 h-0.5 w-8 bg-brand-deep" aria-hidden="true"></div>
          <div className="mt-3 flex items-center gap-3">
            <a href="/stages" className="rounded-lg bg-brand-primary px-4 py-2 text-white">Start Learning</a>
            <a href="/subject/anatomy" className="rounded-lg border border-zinc-400/30 px-4 py-2 text-zinc-100">Browse Programs</a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="h-px bg-white/10" aria-hidden="true"></div>
        <div className="mt-4 text-zinc-400">© {new Date().getFullYear()} Medumentor</div>
      </div>
    </footer>
  )
}