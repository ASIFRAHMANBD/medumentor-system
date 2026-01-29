'use client'
import { useState } from 'react'
import { AuthModal } from './AuthModal'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; view: 'signin' | 'signup' }>({ 
    isOpen: false, 
    view: 'signin' 
  })

  const openAuth = (view: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, view })
    setOpen(false) // Close mobile menu if open
  }

  return (
    <>
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-semibold tracking-tight">
            <span className="text-brand-base">Medu</span><span className="text-brand-secondary">mentor</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/stages">Stages</a>
            <a className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium" href="/subject/anatomy">Programs</a>
            
            <div className="h-4 w-px bg-zinc-300" aria-hidden="true" />
            
            <button 
              onClick={() => openAuth('signin')}
              className="text-zinc-600 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              Sign In
            </button>
            <button 
              onClick={() => openAuth('signup')}
              className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary transition-colors"
            >
              Sign Up
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-lg p-2 text-zinc-600 hover:bg-zinc-100" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-zinc-200 bg-white absolute w-full shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-4">
              <a className="text-zinc-700 hover:text-brand-primary font-medium" href="/stages">Stages</a>
              <a className="text-zinc-700 hover:text-brand-primary font-medium" href="/subject/anatomy">Programs</a>
              <a className="text-zinc-700 hover:text-brand-primary font-medium" href="/admin">Admin</a>
              
              <div className="h-px w-full bg-zinc-100 my-2" />
              
              <button 
                onClick={() => openAuth('signin')}
                className="text-left text-zinc-700 hover:text-brand-primary font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="rounded-lg bg-brand-primary px-4 py-2.5 text-center text-white font-medium hover:bg-brand-secondary"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={authModal.isOpen} 
        initialView={authModal.view} 
        onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))} 
      />
    </>
  )
}