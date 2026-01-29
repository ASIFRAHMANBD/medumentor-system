export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-6">{children}</div>
      </div>
    </div>
  )
}