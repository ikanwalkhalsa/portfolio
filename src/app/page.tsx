import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeetCodeSection from '@/components/LeetCodeSection'
import Testimonials from '@/components/Testimonials'
import PagePreviews from '@/components/PagePreviews'
import CallToAction from '@/components/CallToAction'
import { fetchContent } from '@/lib/content'

// Force dynamic rendering to ensure fresh content on each request
export const dynamic = 'force-dynamic'

export default async function Home() {
  const content = await fetchContent()
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LeetCodeSection />
      <Testimonials content={content.testimonials} />
      <PagePreviews content={content.pagePreviews} />
      <CallToAction />
      <Footer />
    </main>
  )
}
