'use client'

import { useState, useEffect } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserNavbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Mock user data or get from local storage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser({ name: 'Student', email: 'student@medumentor.com' })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href={isAdmin ? "/admin" : "/dashboard"} className="text-2xl font-semibold tracking-tight">
            <span className="text-brand-base">Medu</span><span className="text-brand-secondary">mentor</span>
            {isAdmin && <span className="ml-2 text-xs bg-brand-base text-white px-2 py-0.5 rounded-full">Admin</span>}
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a className={`text-sm font-medium transition-colors ${!isAdmin ? 'text-brand-primary' : 'text-zinc-600 hover:text-brand-primary'}`} href={isAdmin ? "/admin" : "/dashboard"}>
              Overview
            </a>
            {!isAdmin ? (
              <>
                <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/stages">My Learning</a>
                <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/bookmarks">Bookmarks</a>
              </>
            ) : (
              <>
                <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/admin/users">Users</a>
                <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/admin/content">Content</a>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-zinc-600">
            <Bell size={20} />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-zinc-900">{user?.name}</div>
              <div className="text-xs text-zinc-500">{isAdmin ? 'Administrator' : 'Medical Student'}</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <User size={16} />
            </div>
            <button 
              onClick={handleLogout}
              className="ml-2 text-zinc-400 hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
