import { ProgressBar } from '@/components/ProgressBar'

export function StageCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a href={href} className="group block surface p-6 transition-colors hover:border-brand-primary hover:shadow-sm hover-lift">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-brand-base">{title}</div>
        <span className="text-xs text-zinc-500">Medical Stage</span>
      </div>
      <p className="mt-2 text-zinc-600">{description}</p>
      <div className="mt-4">
        <ProgressBar value={0} />
      </div>
    </a>
  )
}