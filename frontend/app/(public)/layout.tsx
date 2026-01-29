import { PageTransition } from '../../components/PageTransition'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  )
}