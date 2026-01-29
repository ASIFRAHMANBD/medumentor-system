'use client'

import { motion } from 'framer-motion'
import { StageCard } from '@/components/StageCard'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function AnimatedStages({ stages }: { stages: { slug: string; name: string; desc: string }[] }) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stages.map(s => (
        <motion.div key={s.slug} variants={item} className="h-full">
          <StageCard title={s.name} description={s.desc} href={`/stage/${s.slug}`} />
        </motion.div>
      ))}
    </motion.div>
  )
}
