import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Eye, Brain, MessageSquare, Image, Code2, Zap } from 'lucide-react'
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

export default async function Demos() {
  const demosContent = loadYamlFile('demos.yml')
  
  // Map YAML demo data to the component format
  const iconMap = {
    'vision-analytics': Eye,
    'nlp-sentiment': MessageSquare,
    'image-generation': Image,
    'code-assistant': Code2,
    'recommendation-engine': Brain,
    'voice-assistant': Zap
  }
  
  const gradientMap = {
    'vision-analytics': 'from-blue-500 to-cyan-500',
    'nlp-sentiment': 'from-purple-500 to-pink-500',
    'image-generation': 'from-green-500 to-emerald-500',
    'code-assistant': 'from-orange-500 to-red-500',
    'recommendation-engine': 'from-indigo-500 to-purple-500',
    'voice-assistant': 'from-teal-500 to-blue-500'
  }
  
  const demos = (demosContent.demos || []).map(demo => ({
    ...demo,
    icon: iconMap[demo.id as keyof typeof iconMap] || Eye,
    gradient: gradientMap[demo.id as keyof typeof gradientMap] || 'from-blue-500 to-cyan-500',
    // Store original status for display
    originalStatus: demo.status,
    // Normalize status for component logic
    status: demo.status.toLowerCase().includes('comming') || demo.status.toLowerCase().includes('coming') || demo.status.toLowerCase().includes('development') ? 'coming-soon' : 'available'
  }))

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gray-900">AI</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Demos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {demosContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Available Now
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Coming Soon
              </div>
            </div>
          </div>

          {/* Demos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {demos.length > 0 ? demos.map((demo) => (
              <div 
                key={demo.id}
                className={`bg-white rounded-lg p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                  demo.status === 'available' 
                    ? 'border-transparent hover:border-primary/20' 
                    : 'border-gray-100 opacity-75'
                }`}
              >
                {/* Demo Icon and Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${demo.gradient} text-white`}>
                    <demo.icon className="h-8 w-8" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    demo.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {demo.status === 'available' ? 'Available' : demo.originalStatus}
                  </span>
                </div>

                {/* Demo Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{demo.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{demo.description}</p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {demo.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {demo.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                {demo.status === 'available' ? (
                  <Link 
                    href={`/demos/${demo.id}`}
                    className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${demo.gradient} text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200`}
                  >
                    Try Demo
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-200 text-gray-500 font-medium rounded-lg cursor-not-allowed"
                  >
                    {demo.originalStatus}
                  </button>
                )}
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No demos available at the moment.</p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in Custom AI Solutions?</h2>
              <p className="text-gray-600 mb-6">
                These demos showcase just a fraction of what&apos;s possible with AI and machine learning. 
                Let&apos;s discuss how we can build something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
                >
                  Start a Project
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
