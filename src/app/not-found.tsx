'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Home, ArrowLeft, Construction, Sparkles, Code, Rocket } from 'lucide-react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 pt-20 pb-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
            404
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Construction className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Construction className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold text-gray-700">Under Construction</span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist yet. This portfolio is still under active development, and this page will be live soon!
          </p>

          {/* Features Coming Soon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-blue-600 mr-2" />
              What's Coming Soon?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">More Projects</h3>
                  <p className="text-sm text-gray-600">Additional portfolio showcases</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">AI Features</h3>
                  <p className="text-sm text-gray-600">Interactive resume chat</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Construction className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Blog Section</h3>
                  <p className="text-sm text-gray-600">Technical articles & insights</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Contact Portal</h3>
                  <p className="text-sm text-gray-600">Direct communication hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Fun Animation */}
          <div className="pt-8">
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-8 text-center">
            <p className="text-gray-500 mb-2">
              Need immediate assistance?
            </p>
            <p className="text-gray-600">
              Feel free to reach out via the contact page or check out my existing work!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
