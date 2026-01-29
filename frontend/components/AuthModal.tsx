'use client'
import { useState, useEffect } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'signin' | 'signup'
}

export function AuthModal({ isOpen, onClose, initialView = 'signin' }: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup' | 'verify'>(initialView)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setView(initialView)
      setError('')
      setEmail('')
      setPassword('')
      setName('')
      setVerificationCode('')
    }
  }, [isOpen, initialView])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      
      let endpoint = '';
      let body = {};

      if (view === 'signin') {
        endpoint = `${apiUrl}/auth/login`;
        body = { email, password };
      } else if (view === 'signup') {
        endpoint = `${apiUrl}/auth/register`;
        body = { email, password, name };
      } else if (view === 'verify') {
        endpoint = `${apiUrl}/auth/verify`;
        body = { email, code: verificationCode };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      // Handle success
      console.log('Success:', data)
      
      if (view === 'signup' && data.requiresVerification) {
        setView('verify');
        // No alert needed, UI will change
      } else if (view === 'verify' || view === 'signin') {
        onClose();
        
        // Store token/user (simple implementation, ideally use context/storage helper)
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Redirect based on role
        if (data.user?.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-base/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="bg-brand-base px-6 py-8 text-center relative overflow-hidden">
           {/* Decorative background elements */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl"></div>
           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>

          <h2 className="text-2xl font-semibold text-white relative z-10">
            {view === 'signin' ? 'Welcome Back' : view === 'signup' ? 'Join Medumentor' : 'Verify Account'}
          </h2>
          <p className="mt-2 text-sm text-zinc-300 relative z-10">
            {view === 'signin' 
              ? 'Enter your credentials to access your account' 
              : view === 'signup'
                ? 'Start your structured learning journey today'
                : 'Enter your email and the verification code'}
          </p>
        </div>


        {/* Form */}
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                {error}
              </div>
            )}

            {view === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-zinc-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary sm:text-sm"
                  placeholder="Dr. Alex Smith"
                />
              </div>
            )}

            {/* Email Field - Visible in all views */}
            <div>
              <label className="block text-sm font-medium text-zinc-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary sm:text-sm"
                placeholder="alex@example.com"
              />
            </div>

            {(view === 'signin' || view === 'signup') && (
              <div>
                <label className="block text-sm font-medium text-zinc-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            )}

            {view === 'verify' && (
              <div>
                <label className="block text-sm font-medium text-zinc-700">Verification Code</label>
                <input
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary sm:text-sm text-center tracking-widest text-lg"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : (view === 'signin' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Verify Email')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-600 space-y-2">
            {view === 'signin' ? (
              <>
                <div>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setView('signup')} 
                    className="font-medium text-brand-primary hover:text-brand-secondary"
                  >
                    Sign up
                  </button>
                </div>
                <div>
                  <button 
                    onClick={() => setView('verify')} 
                    className="font-medium text-zinc-500 hover:text-zinc-700 text-xs underline decoration-zinc-300 underline-offset-2"
                  >
                    Have a code? Verify email
                  </button>
                </div>
              </>
            ) : view === 'signup' ? (

              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setView('signin')} 
                  className="font-medium text-brand-primary hover:text-brand-secondary"
                >
                  Sign in
                </button>
              </>
            ) : (
              <button 
                onClick={() => setView('signin')} 
                className="font-medium text-brand-primary hover:text-brand-secondary"
              >
                Back to Sign in
              </button>
            )}
          </div>
        </div>


        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
