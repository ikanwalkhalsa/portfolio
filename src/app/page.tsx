import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeetCodeSection from '@/components/LeetCodeSection'
import Testimonials from '@/components/Testimonials'
import PagePreviews from '@/components/PagePreviews'
import CallToAction from '@/components/CallToAction'
import * as yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

// Force dynamic rendering to ensure fresh content on each request
export const dynamic = 'force-dynamic'

// Function to load YAML content directly
function loadYamlFile(filename: string): any {
  try {
    const contentDir = path.join(process.cwd(), 'content')
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return yaml.load(fileContent)
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    return null
  }
}

export default async function Home() {
  // Load content directly from YAML files
  const testimonialsContent = loadYamlFile('testimonials.yml')
  const pagePreviewsContent = loadYamlFile('page-previews.yml')
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LeetCodeSection />
      <Testimonials content={testimonialsContent} />
      <PagePreviews content={pagePreviewsContent} />
      <CallToAction />
      <Footer />
    </main>
  )
}
