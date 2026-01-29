'use client'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const key = usePathname()
  return (
    <div key={key} className="animate-fade-in">
      {children}
    </div>
  )
}