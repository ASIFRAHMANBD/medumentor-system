'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form className="space-y-4">
      <div className="text-xl font-semibold">Create account</div>
      <div className="space-y-2">
        <label className="block text-sm text-zinc-700">Name</label>
        <input className="w-full rounded-lg border border-zinc-300 px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-zinc-700">Email</label>
        <input className="w-full rounded-lg border border-zinc-300 px-3 py-2" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-zinc-700">Password</label>
        <input className="w-full rounded-lg border border-zinc-300 px-3 py-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="w-full rounded-lg bg-accent text-white px-3 py-2">Create</button>
    </form>
  )
}