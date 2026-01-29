'use client'

import { Users, BookOpen, BarChart3, Settings, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, bg: 'bg-brand-base' },
    { label: 'Active Learners', value: '856', change: '+5%', icon: BarChart3, bg: 'bg-brand-secondary' },
    { label: 'Content Modules', value: '42', change: '+2', icon: BookOpen, bg: 'bg-brand-deep' },
    { label: 'Pending Reviews', value: '8', change: '-3', icon: AlertCircle, bg: 'bg-brand-primary' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Admin Dashboard</h1>
        <button className="px-4 py-2 bg-brand-base text-white rounded-lg text-sm font-medium hover:bg-brand-base/90 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 text-white">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-6">Recent Signups</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0 hover:bg-zinc-50 px-2 -mx-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-base/5 flex items-center justify-center text-brand-base text-sm font-medium">
                    U{i}
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">User {i}</div>
                    <div className="text-xs text-zinc-500">user{i}@example.com</div>
                  </div>
                </div>
                <span className="text-xs text-zinc-400">2 mins ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-6">System Status</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-600">Server Load</span>
                <span className="font-medium text-zinc-900">45%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary w-[45%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-600">Database Usage</span>
                <span className="font-medium text-zinc-900">72%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-secondary w-[72%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-600">Storage</span>
                <span className="font-medium text-zinc-900">28%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-deep w-[28%] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button className="flex items-center gap-2 text-zinc-600 hover:text-brand-primary text-sm font-medium transition-colors">
              <Settings size={16} />
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
