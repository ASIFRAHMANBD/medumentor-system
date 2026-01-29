import { UserNavbar } from '@/components/UserNavbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <UserNavbar isAdmin={true} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
