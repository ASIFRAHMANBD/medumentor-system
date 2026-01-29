'use client'

import { motion } from 'framer-motion'
import { PlayCircle, Clock, BookOpen, Trophy, ArrowRight } from 'lucide-react'

export default function UserDashboard() {
  const recentModules = [
    { title: 'Upper Limb Anatomy', progress: 75, lastAccessed: '2 hours ago', color: 'bg-brand-primary' },
    { title: 'General Physiology', progress: 30, lastAccessed: '1 day ago', color: 'bg-brand-secondary' },
    { title: 'Biochemistry Basics', progress: 10, lastAccessed: '3 days ago', color: 'bg-brand-deep' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Welcome back, Student! 👋</h1>
          <p className="text-zinc-500 mt-1">Ready to continue your medical journey?</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Daily Streak</div>
              <div className="font-bold text-zinc-900">12 Days</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-brand-secondary/10 text-brand-secondary rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Time Spent</div>
              <div className="font-bold text-zinc-900">24h 30m</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900">Continue Learning</h2>
          <a href="/stages" className="text-sm text-brand-primary hover:text-brand-secondary font-medium flex items-center gap-1">
            View all <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentModules.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-full ${module.color} flex items-center justify-center text-white`}>
                  <BookOpen size={18} />
                </div>
                <span className="text-xs font-medium text-zinc-400">{module.lastAccessed}</span>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-brand-primary transition-colors">{module.title}</h3>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-500">Progress</span>
                  <span className="font-medium text-zinc-900">{module.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${module.color} rounded-full`} 
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended & Daily Quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recommended for you</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-zinc-100">
                <div className="relative w-24 h-16 bg-zinc-200 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                    <PlayCircle size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Understanding Cardiac Cycle</h4>
                  <p className="text-sm text-zinc-500 line-clamp-1">A comprehensive guide to the phases of the cardiac cycle.</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full">Physiology</span>
                    <span className="text-xs text-zinc-400">• 12 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-base text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-2">Daily Quiz</h3>
            <p className="text-zinc-300 text-sm mb-6">Test your knowledge with today's 5 rapid-fire questions.</p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</div>
                <span>Anatomy of the Heart</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</div>
                <span>Nerve Function</span>
              </div>
            </div>

            <button className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-medium transition-colors">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
