import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Award, Code, Database, Brain, Folder, Users, ExternalLink } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import * as yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

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

export default async function About() {
  // Load content directly from YAML files
  const about = loadYamlFile('about.yml')
  const contact = loadYamlFile('contact.yml')
  const hero = loadYamlFile('hero.yml')

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {about.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Me</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {about.subtitle}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {hero.stats?.customStats
              ?.filter((stat: any) => stat.show)
              ?.map((stat: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      duration={2000}
                      delay={index * 200}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
          </div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="h-6 w-6 text-primary mr-3" />
                {about.sections.bio.title}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>{about.sections.bio.content}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 text-primary mr-3" />
                {about.sections.achievements.title}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">{about.sections.achievements.content}</p>
                {about.sections.achievements.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="text-gray-600">{highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section */}
          {about.sections.projects && (
            <div className="mb-16">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Folder className="h-6 w-6 text-primary mr-3" />
                  {about.sections.projects.title}
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-6">{about.sections.projects.content}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {about.sections.projects.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-gray-700 text-sm">{highlight}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expertise Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{about.sections.expertise.title}</h2>
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <p className="text-gray-600 text-center mb-6">{about.sections.expertise.content}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {about.sections.expertise.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LinkedIn Integration */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Professional Network</h2>
              </div>
              <a
                href="https://www.linkedin.com/in/ikanwalkhalsa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Professional Connections</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">Active</div>
                <div className="text-sm text-gray-600">Community Engagement</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Code className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">AI/ML</div>
                <div className="text-sm text-gray-600">Industry Focus</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Connect with me on LinkedIn to stay updated with my latest AI/ML projects, insights, and professional achievements. 
                I regularly share technical content and collaborate with fellow professionals in the machine learning community.
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  )
}
