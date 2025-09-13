import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ExternalLink, Github, Calendar, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import * as yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

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

export default async function Projects() {
  const projectsContent = loadYamlFile('projects.yml')
  const projects = projectsContent?.projects || []
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collection of AI/ML projects that showcase my expertise in computer vision, NLP, data engineering, and software development. 
              Each project demonstrates real-world problem-solving and technical innovation.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-8">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.summary}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Github className="h-5 w-5 text-gray-700" />
                        </a>
                      )}
                      {project.links.demo && (
                        <Link
                          href={project.links.demo}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 text-gray-700" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.date).getFullYear()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{project.team}</span>
                      </div>
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Problem</h4>
                      <p className="text-gray-600 text-sm">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-600 text-sm">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                      <p className="text-gray-600 text-sm">{project.impact}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Areas */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in Collaborating?</h2>
              <p className="text-gray-600 mb-6">
                I&apos;m always excited to work on new projects and challenges. Let&apos;s discuss how we can create something amazing together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
