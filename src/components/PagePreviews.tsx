import React from 'react'
import Link from 'next/link'
import { User, Folder, Award, Play, MessageCircle, Mail, ArrowRight, Check } from 'lucide-react'

interface PagePreview {
  title: string
  description: string
  icon: string
  href: string
  features: string[]
  color: string
  show: boolean
}

interface PagePreviewsContent {
  title: string
  subtitle: string
  pages: PagePreview[]
}

interface PagePreviewsProps {
  content: PagePreviewsContent
}

const PagePreviews: React.FC<PagePreviewsProps> = ({ content }) => {
  // Add defensive programming
  if (!content || !content.pages) {
    return <div>Loading page previews...</div>
  }
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <User className="h-8 w-8" />
      case 'folder':
        return <Folder className="h-8 w-8" />
      case 'award':
        return <Award className="h-8 w-8" />
      case 'play':
        return <Play className="h-8 w-8" />
      case 'message-circle':
        return <MessageCircle className="h-8 w-8" />
      case 'mail':
        return <Mail className="h-8 w-8" />
      default:
        return <User className="h-8 w-8" />
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          accent: 'text-blue-600'
        }
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          accent: 'text-green-600'
        }
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700',
          accent: 'text-yellow-600'
        }
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
          accent: 'text-purple-600'
        }
      case 'indigo':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          icon: 'text-indigo-600',
          button: 'bg-indigo-600 hover:bg-indigo-700',
          accent: 'text-indigo-600'
        }
      case 'pink':
        return {
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          icon: 'text-pink-600',
          button: 'bg-pink-600 hover:bg-pink-700',
          accent: 'text-pink-600'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          accent: 'text-gray-600'
        }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Page Previews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.pages
            .filter((page) => page.show)
            .map((page, index) => {
              const colors = getColorClasses(page.color)
              
              return (
                <div
                  key={index}
                  className={`${colors.bg} ${colors.border} rounded-xl border-2 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  {/* Icon */}
                  <div className={`${colors.icon} mb-4`}>
                    {getIcon(page.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {page.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {page.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold ${colors.accent} mb-2`}>
                      What you'll find:
                    </h4>
                    <ul className="space-y-1">
                      {page.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Check className={`h-4 w-4 ${colors.icon} mr-2 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={page.href}
                    className={`${colors.button} inline-flex items-center justify-center w-full px-4 py-3 text-white font-medium rounded-lg transition-colors duration-200`}
                  >
                    Explore {page.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              )
            })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to dive deeper into any of these areas?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {content.pages
              .filter((page) => page.show)
              .map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {page.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PagePreviews
