export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xl p-6">
        {children}
      </div>
    </div>
  )
}