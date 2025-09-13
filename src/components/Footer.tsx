'use client'

import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Heart, Code, Phone } from 'lucide-react'
import Link from 'next/link'
import { ContentConfig } from '@/lib/content'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [content, setContent] = useState<ContentConfig | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/content')
        if (response.ok) {
          const apiContent = await response.json()
          setContent(apiContent)
        }
      } catch (error) {
        console.error('Failed to load footer content:', error)
      }
    }
    
    loadContent()
  }, [])

  if (!content) {
    return null // or a loading state
  }

  const { footer, contact, navigation } = content

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-5 w-5" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />
      case 'code':
        return <Code className="h-5 w-5" />
      case 'mail':
        return <Mail className="h-5 w-5" />
      case 'phone':
        return <Phone className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Kanwalpreet Singh</h3>
            <p className="text-gray-300 leading-relaxed">
              Machine Learning Engineer passionate about building innovative AI solutions that make a real impact.
            </p>
            <div className="flex space-x-4">
              {footer.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Machine Learning Solutions</li>
              <li>AI Development</li>
              <li>Data Engineering</li>
              <li>Backend Development</li>
              <li>Computer Vision</li>
              <li>NLP Solutions</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 {contact.info.location}</p>
              <p>📧 {contact.info.email}</p>
              <p>📱 {contact.info.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 flex items-center space-x-2">
              {footer.copyright.replace('2024', currentYear.toString())} 
              Made with <Heart className="h-4 w-4 text-red-500" /> using Next.js
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footer.links.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
