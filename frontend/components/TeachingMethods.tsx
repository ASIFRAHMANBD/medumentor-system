'use client'

import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  FileText, 
  Compass, 
  Image as ImageIcon, 
  HelpCircle, 
  Mic,
  ArrowRight
} from 'lucide-react'

const methods = [
  {
    icon: PlayCircle,
    title: "Video Lectures",
    description: "High-definition video lessons that break down complex medical concepts into easy-to-understand segments.",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10"
  },
  {
    icon: FileText,
    title: "Smart Notes",
    description: "Concise, high-yield notes perfect for rapid revision and solidifying your theoretical knowledge.",
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/10"
  },
  {
    icon: Compass,
    title: "Guided Paths",
    description: "Step-by-step learning guides that ensure you never get lost in the vast medical curriculum.",
    color: "text-brand-deep",
    bg: "bg-brand-deep/10"
  },
  {
    icon: ImageIcon,
    title: "Visual Atlas",
    description: "High-resolution anatomical images and clinical diagrams to enhance your visual memory.",
    color: "text-brand-base",
    bg: "bg-brand-base/10"
  },
  {
    icon: HelpCircle,
    title: "Q&A Bank",
    description: "Extensive practice questions and clinical scenarios to test your application skills.",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10"
  },
  {
    icon: Mic,
    title: "Audio Viva",
    description: "Interactive audio sessions to prepare you for oral exams and improve your medical vocabulary.",
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/10"
  }
]

export function TeachingMethods() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {methods.map((method, index) => (
        <motion.div
          key={method.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="group relative p-6 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
              <method.icon className={`w-6 h-6 ${method.color}`} />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300">
              <ArrowRight size={20} />
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-brand-primary transition-colors">
            {method.title}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {method.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
