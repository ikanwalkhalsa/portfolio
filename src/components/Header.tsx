'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { ContentConfig, loadContent } from '@/lib/content'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [content, setContent] = useState<ContentConfig>(() => loadContent())
  const { navigation } = content

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadApiContent = async () => {
      try {
        const response = await fetch('/api/content')
        if (response.ok) {
          const apiContent = await response.json()
          setContent(apiContent)
        }
      } catch (error) {
        console.error('Failed to load content:', error)
      }
    }
    
    loadApiContent()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {navigation.logo && (
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary">
                {navigation.logo}
              </Link>
            </div>
          )}
          
          <nav className={`hidden md:block ${!navigation.logo ? 'mx-auto' : ''}`}>
            <div className={`flex items-center space-x-4 ${navigation.logo ? 'ml-10' : ''}`}>
              {navigation.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className={`md:hidden ${!navigation.logo ? 'absolute right-0' : ''}`}>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {navigation.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
