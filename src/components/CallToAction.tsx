import React from 'react'
import Link from 'next/link'

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in working together?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss your next AI project, career opportunities, or just have a chat about technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Get In Touch
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
