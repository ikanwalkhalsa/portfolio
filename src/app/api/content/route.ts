import { NextResponse } from 'next/server'
import * as yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Load content from YAML files
    const contentDir = path.join(process.cwd(), 'content')
    
    const heroContent = yaml.load(fs.readFileSync(path.join(contentDir, 'hero.yml'), 'utf8'))
    const aboutContent = yaml.load(fs.readFileSync(path.join(contentDir, 'about.yml'), 'utf8'))
    const contactContent = yaml.load(fs.readFileSync(path.join(contentDir, 'contact.yml'), 'utf8'))
    const navigationContent = yaml.load(fs.readFileSync(path.join(contentDir, 'navigation.yml'), 'utf8'))
    const footerContent = yaml.load(fs.readFileSync(path.join(contentDir, 'footer.yml'), 'utf8'))
    const demosContent = yaml.load(fs.readFileSync(path.join(contentDir, 'demos.yml'), 'utf8'))
    const resumeChatContent = yaml.load(fs.readFileSync(path.join(contentDir, 'resume-chat.yml'), 'utf8'))
    const metadataContent = yaml.load(fs.readFileSync(path.join(contentDir, 'metadata.yml'), 'utf8'))
    const testimonialsContent = yaml.load(fs.readFileSync(path.join(contentDir, 'testimonials.yml'), 'utf8'))
    const pagePreviewsContent = yaml.load(fs.readFileSync(path.join(contentDir, 'page-previews.yml'), 'utf8'))
    const achievementsContent = yaml.load(fs.readFileSync(path.join(contentDir, 'achievements.yml'), 'utf8'))
    const projectsContent = yaml.load(fs.readFileSync(path.join(contentDir, 'projects.yml'), 'utf8'))

    const content = {
      hero: heroContent,
      about: aboutContent,
      contact: contactContent,
      navigation: navigationContent,
      footer: footerContent,
      demos: demosContent,
      resumeChat: resumeChatContent,
      metadata: metadataContent,
      testimonials: testimonialsContent,
      pagePreviews: pagePreviewsContent,
      achievements: achievementsContent,
      projects: projectsContent
    }

    const response = NextResponse.json(content)
    
    // Disable caching in development for live YAML updates
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
    }

    return response
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}
