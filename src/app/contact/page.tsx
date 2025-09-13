'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Github, Linkedin, Send, Clock, Sparkles } from 'lucide-react'
import { ContentConfig } from '@/lib/content'
import PageLoader from '@/components/PageLoader'

export default function Contact() {
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
        console.error('Failed to load contact content:', error)
      }
    }
    
    loadContent()
  }, [])

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <PageLoader message="Loading contact information..." />
        </div>
        <Footer />
      </div>
    )
  }

  const { contact } = content
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gray-900">Get In</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
                <p className="text-gray-600 mb-8">
                  Whether you&apos;re looking for a Machine Learning Engineer, want to collaborate on a project, 
                  or just want to chat about AI and technology, I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a href={`mailto:${contact.info.email}`} className="text-gray-600 hover:text-primary transition-colors">
                      {contact.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <a href={`tel:${contact.info.phone}`} className="text-gray-600 hover:text-primary transition-colors">
                      {contact.info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-gray-600">{contact.info.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find me on</h3>
                <div className="flex space-x-4">
                  <a
                    href={contact.info.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Github className="h-6 w-6 text-gray-700" />
                  </a>
                  <a
                    href={contact.info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-gray-700" />
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
                <p className="text-gray-600 mb-3">
                  I&apos;m currently open to new opportunities and collaborations.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Full-time positions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Freelance projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Consulting opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{contact.form.title}</h2>
                {/* Coming Soon Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4 mr-1" />
                  Coming Soon
                  <Sparkles className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Contact Form Coming Soon!</p>
                    <p className="text-sm text-blue-700">
                      This feature is currently under development. In the meantime, feel free to reach out via phone, email, or LinkedIn using the contact information on the left.
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {contact.form.fields.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50 text-gray-400 cursor-not-allowed"
                      placeholder={contact.form.fields.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {contact.form.fields.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50 text-gray-400 cursor-not-allowed"
                      placeholder={contact.form.fields.email}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50 text-gray-400 cursor-not-allowed"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none bg-gray-50 text-gray-400 cursor-not-allowed"
                    placeholder={contact.form.fields.message}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled
                  className="w-full bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{contact.form.submit}</span>
                </button>
              </form>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3 h-3 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 mb-1">Alternative Contact Methods</p>
                    <p className="text-sm text-amber-700">
                      For immediate assistance, please contact me directly via phone, email, or LinkedIn using the information provided on the left.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What I&apos;m Looking For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Projects that push the boundaries of AI and machine learning, solving real-world problems with cutting-edge technology.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  Working with passionate teams and individuals who share a vision for creating meaningful impact through technology.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
                <p className="text-gray-600">
                  Opportunities to learn new technologies, take on challenging problems, and grow both technically and professionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
