'use client'

import { motion, Variants } from 'framer-motion'
import { 
  BookOpen, 
  Activity, 
  Dna, 
  Scale, 
  Users, 
  Microscope, 
  TestTube, 
  Pill, 
  Stethoscope, 
  HeartPulse,
  Brain, 
  Eye,
  Ear,
  Syringe
} from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const curriculumData = [
  {
    stage: "Beginner's Journey",
    number: "1",
    theme: "base",
    description: "Building the foundation with core pre-clinical sciences.",
    subjects: [
      {
        name: "Anatomy",
        icon: BookOpen,
        description: "Structure of the human body",
        sections: [
          "General Anatomy", "Embryology", "Histology", 
          "Upper Limb", "Lower Limb", "Thorax", 
          "Abdomen & Pelvis", "Head & Neck", "Neuroanatomy", "Genetics"
        ]
      },
      {
        name: "Physiology",
        icon: Activity,
        description: "Function of organs & systems",
        sections: [
          "General Physio", "Hematology", "Nerve-Muscle", 
          "Cardiovascular", "Respiratory", "Gastrointestinal", 
          "Renal", "Endocrine", "CNS", "Special Senses", "Reproduction"
        ]
      },
      {
        name: "Biochemistry",
        icon: Dna,
        description: "Molecular basis of life",
        sections: [
          "Cell Biology", "Carbohydrates", "Lipids", 
          "Proteins", "Enzymes", "Vitamins", 
          "Minerals", "Molecular Biology", "Metabolism"
        ]
      }
    ]
  },
  {
    stage: "Getting Familiar",
    number: "2",
    theme: "secondary",
    description: "Bridging the gap between basic sciences and clinical practice.",
    subjects: [
      {
        name: "Pathology",
        icon: Microscope,
        description: "Study of disease processes",
        sections: [
          "General Pathology", "Hematology", "Clinical Pathology", 
          "Systemic Pathology"
        ]
      },
      {
        name: "Pharmacology",
        icon: Pill,
        description: "Drugs and interactions",
        sections: [
          "General Pharma", "ANS", "CVS", "Renal", 
          "CNS", "Autacoids", "Chemotherapy", "Endocrine"
        ]
      },
      {
        name: "Microbiology",
        icon: TestTube,
        description: "Microorganisms & Immunology",
        sections: [
          "General Micro", "Immunology", "Bacteriology", 
          "Virology", "Mycology", "Parasitology"
        ]
      },
      {
        name: "Forensic Medicine",
        icon: Scale,
        description: "Medical jurisprudence",
        sections: [
          "Legal Procedures", "Thanatology", "Asphyxia", 
          "Toxicology", "Sexual Jurisprudence"
        ]
      }
    ]
  },
  {
    stage: "Becoming Expert",
    number: "3",
    theme: "primary",
    subjects: [
      {
        name: "Community Medicine",
        icon: Users,
        description: "Public health & prevention",
        sections: [
          "Epidemiology", "Biostatistics", "Health Programs",
          "Communicable Diseases", "Nutrition"
        ]
      },
      {
        name: "General Medicine",
        icon: Stethoscope,
        description: "Diagnosis & treatment",
        sections: [
          "Infections", "CVS", "Respiratory", "GIT", 
          "Nephrology", "Neurology", "Endocrinology"
        ]
      },
      {
        name: "General Surgery",
        icon: Syringe,
        description: "Operative procedures",
        sections: [
          "General Surgery", "Trauma", "Abdominal", 
          "Urology", "Neurosurgery", "Thoracic"
        ]
      },
      {
        name: "Ophthalmology",
        icon: Eye,
        description: "Eye disorders",
        sections: ["Optics", "Cornea", "Retina", "Glaucoma", "Lens"]
      },
      {
        name: "ENT",
        icon: Ear,
        description: "Ear, Nose, Throat",
        sections: ["Ear", "Nose", "Pharynx", "Larynx", "Head & Neck"]
      }
    ]
  }
]

export function CurriculumAnimation() {
  return (
    <section className="bg-zinc-50 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-zinc-900"
          >
            Complete Medical Curriculum
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-600 max-w-2xl mx-auto"
          >
            A comprehensive, structured roadmap covering every subject and section from first year to final year.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {curriculumData.map((stage, idx) => (
            <motion.div
              key={stage.stage}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col gap-6"
            >
              {/* Stage Header */}
              <motion.div variants={item} className="pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm text-white
                    ${stage.theme === 'base' ? 'bg-brand-base' : 
                      stage.theme === 'secondary' ? 'bg-brand-secondary' : 
                      'bg-brand-primary'}`}
                  >
                    {stage.number}
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900">{stage.stage}</h3>
                </div>
                <p className="text-sm text-zinc-500 pl-11">{stage.description}</p>
              </motion.div>

              {/* Subjects List */}
              <div className="space-y-4">
                {stage.subjects.map((subject) => (
                  <SubjectCard 
                    key={subject.name} 
                    subject={subject} 
                    theme={stage.theme} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center border-t border-zinc-200 pt-8"
        >
          <p className="text-lg font-medium text-zinc-800">
            Every topic organized for <span className="text-brand-primary">clarity and retention</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function SubjectCard({ subject, theme }: { subject: any, theme: string }) {
  const { name, description, icon: Icon, sections } = subject
  
  const themeStyles = {
    base: { 
      bg: 'bg-brand-base/5', 
      iconBg: 'bg-white text-brand-base', 
      border: 'border-brand-base/10', 
      badge: 'bg-brand-base/10 text-brand-base hover:bg-brand-base hover:text-white transition-colors' 
    },
    secondary: { 
      bg: 'bg-brand-secondary/5', 
      iconBg: 'bg-white text-brand-secondary', 
      border: 'border-brand-secondary/10', 
      badge: 'bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors' 
    },
    primary: { 
      bg: 'bg-brand-primary/5', 
      iconBg: 'bg-white text-brand-primary', 
      border: 'border-brand-primary/10', 
      badge: 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors' 
    },
  }

  const styles = themeStyles[theme as keyof typeof themeStyles] || themeStyles.base

  return (
    <motion.div 
      variants={item}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-xl border ${styles.border} bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
        <Icon size={100} />
      </div>

      <div className="relative flex items-start gap-4">
        <div className={`p-2.5 rounded-lg shadow-sm ${styles.iconBg} ring-1 ring-black/5`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-zinc-900 text-lg mb-1">{name}</h4>
          <p className="text-sm text-zinc-500 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {sections.map((section: string, idx: number) => (
              <motion.span 
                key={section} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium cursor-default ${styles.badge}`}
              >
                {section}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
