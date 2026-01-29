import { SectionHeading } from '@/components/SectionHeading'
import { StageCard } from '@/components/StageCard'
import { HowItWorks } from '@/components/HowItWorks'
import { BenefitsGrid } from '@/components/BenefitsGrid'
import { Testimonials } from '@/components/Testimonials'
import { MasonryGrid } from '@/components/MasonryGrid'
import { StatsBar } from '@/components/StatsBar'
import { LogosStripe } from '@/components/LogosStripe'
import { FeatureList } from '@/components/FeatureList'
import { CTASection } from '@/components/CTASection'
import { CurriculumAnimation } from '@/components/CurriculumAnimation'
import { AnimatedStages } from '@/components/AnimatedStages'
import { TeachingMethods } from '@/components/TeachingMethods'

export const metadata = {
  title: 'Medumentor — Calm, structured learning',
  description: 'Stage-based journeys with clear hierarchy across video, notes, and exams.',
}

export default function HomePage() {
  const stages = [
    { slug: 'beginner', name: "Beginner's Journey", desc: "Build your foundation with Anatomy, Physiology, and Biochemistry." },
    { slug: 'familiar', name: "Getting Familiar", desc: "Bridge the gap with Pathology, Pharmacology, and Microbiology." },
    { slug: 'expert', name: 'Becoming Expert', desc: "Master clinical skills in Medicine, Surgery, and specialized fields." },
  ]

  return (
    <main>
      <section className="relative charcoal-bg overflow-hidden">
        <div className="absolute inset-0 medical-cross-pattern opacity-30" aria-hidden="true"></div>
        <div className="absolute inset-0 gradient-overlay" aria-hidden="true"></div>
        
        {/* Floating Medical Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-28 min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-brand-primary mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-primary mr-2 animate-pulse"></span>
              The New Standard in Medical Education
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Master Medicine with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Structured Precision</span>
            </h1>
            <p className="mt-4 text-zinc-300 max-w-2xl text-lg leading-relaxed">
              Navigate your medical journey through stage-based learning paths. From foundational sciences to clinical mastery, we provide the clarity you need to excel.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/stages" className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-brand-primary/25">
                Start Learning Now
              </a>
              <a href="/stages" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-sm">
                Explore Subjects
              </a>
            </div>
          </div>
          
          <div className="mt-20">
            <StatsBar />
          </div>
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-zinc-500 mb-4">Trusted by students from</p>
            <LogosStripe variant="dark" />
          </div>
        </div>
      </section>
      <div className="editorial-hr mx-auto max-w-6xl"></div>

      {/* Curriculum Overview Animation */}
      <CurriculumAnimation />

      <div className="editorial-hr mx-auto max-w-6xl"></div>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeading title="Learning Stages" subtitle="Medical stage-based paths: foundations → clinical mastery." />
          <AnimatedStages stages={stages} />
        </div>
      </section>
      <div className="editorial-hr mx-auto max-w-6xl"></div>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeading title="How learning works" subtitle="Stage → Subject → Module → Chapter. Oriented at every step." />
          <HowItWorks variant="light" />
          <TeachingMethods />
        </div>
      </section>
      <div className="editorial-hr mx-auto max-w-6xl"></div>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeading title="Designed for serious learners" subtitle="Crafted for medical students — clarity, evidence, and focus." />
          <BenefitsGrid />
        </div>
      </section>
      <div className="editorial-hr mx-auto max-w-6xl"></div>

      <Testimonials />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeading title="Featured programs" subtitle="Curated medical programs with in-depth modules and assessments." />
          <MasonryGrid items={[
            { title: 'Anatomy Essentials', subtitle: 'Foundations and applied modules', href: '/subject/anatomy' },
            { title: 'Physiology Core', subtitle: 'Systems and integrative function', href: '/subject/physiology' },
            { title: 'Microbiology Focus', subtitle: 'Pathogens and immunity', href: '/subject/microbiology' },
            { title: 'Neuro Pathways', subtitle: 'Neuro anatomy and clinical', href: '/module/neuro' },
            { title: 'Thorax Series', subtitle: 'Step-by-step chapters', href: '/module/thorax' },
            { title: 'Exam Readiness', subtitle: 'MCQ + Written + Viva practice', href: '/stages' },
          ]} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeading title="Built for edtech performance" subtitle="Premium medical edtech: clarity, speed, and measurable progress." />
          <FeatureList />
        </div>
      </section>

      <CTASection />
    </main>
  )
}