export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded bg-zinc-200">
      <div className="h-2 rounded bg-accent" style={{ width: `${Math.min(100, Math.max(0, value))}%` }}></div>
    </div>
  )
}