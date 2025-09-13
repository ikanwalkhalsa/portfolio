import React from 'react'
import { Github, Linkedin, Mail, Phone, Rocket, Code } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchLeetCodeStats } from '@/lib/content'
import AnimatedCounter from './AnimatedCounter'
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

const Hero = async () => {
  const hero = loadYamlFile('hero.yml')
  const contact = loadYamlFile('contact.yml')
  const leetCodeStats = await fetchLeetCodeStats()
  
  // Add timestamp to force re-rendering in development
  const timestamp = process.env.NODE_ENV === 'development' ? Date.now() : ''

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
      {/* Hidden timestamp to force re-rendering in development */}
      {timestamp && <div style={{ display: 'none' }} data-timestamp={timestamp} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {hero.greeting}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {hero.name}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                {hero.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                {hero.description}
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {hero.stats?.showLeetCode ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter 
                        end={leetCodeStats?.totalSolved || 0} 
                        suffix="+" 
                        duration={2000}
                        delay={0}
                      />
                    </div>
                    <div className="text-sm text-gray-600">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter 
                        end={leetCodeStats?.acceptanceRate || "90%"} 
                        duration={2000}
                        delay={200}
                      />
                    </div>
                    <div className="text-sm text-gray-600">LeetCode Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter 
                        end={leetCodeStats?.ranking ? Math.round(leetCodeStats.ranking / 1000) : 50} 
                        suffix="K+" 
                        duration={2000}
                        delay={400}
                      />
                    </div>
                    <div className="text-sm text-gray-600">LeetCode Ranking</div>
                  </div>
                </>
              ) : (
                hero.stats?.customStats?.filter((stat: any) => stat.show).map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      <AnimatedCounter 
                        end={stat.value} 
                        duration={2000}
                        delay={index * 200}
                      />
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
            

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                {hero.cta.secondary}
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                {hero.cta.primary}
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href={contact.info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Github className="h-5 w-5 text-gray-700" />
              </a>
              <a
                href={contact.info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5 text-gray-700" />
              </a>
              <a
                href="https://leetcode.com/u/kanwalpreetsingh/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Code className="h-5 w-5 text-gray-700" />
              </a>
              <a
                href={`mailto:${contact.info.email}`}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Mail className="h-5 w-5 text-gray-700" />
              </a>
              <a
                href={`tel:${contact.info.phone}`}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Phone className="h-5 w-5 text-gray-700" />
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-2xl">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{hero.title}</div>
                  <div className="text-sm text-gray-600">{hero.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
