'use client'

import React, { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { TestimonialsContent } from '@/lib/content'

interface TestimonialsProps {
  content: TestimonialsContent
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  
  const visibleTestimonials = content?.testimonials?.filter((testimonial) => testimonial.show) || []
  const totalTestimonials = visibleTestimonials.length
  
  // Default carousel config
  const carouselConfig = content?.carousel || {
    autoRotate: true,
    interval: 5000,
    showDots: true,
    showArrows: true
  }

  // Auto-rotate functionality
  useEffect(() => {
    if (!carouselConfig.autoRotate || !isAutoRotating || totalTestimonials <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials)
    }, carouselConfig.interval)

    return () => clearInterval(interval)
  }, [carouselConfig.autoRotate, carouselConfig.interval, totalTestimonials, isAutoRotating])

  // Add defensive programming after hooks
  if (!content || !content.testimonials || totalTestimonials === 0) {
    return <div>Loading testimonials...</div>
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    )
    setIsAutoRotating(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials)
    setIsAutoRotating(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoRotating(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const currentTestimonial = visibleTestimonials[currentIndex]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-blue-100">
              <Quote className="h-12 w-12" />
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-gray-100 shadow-lg">
                  {currentTestimonial.avatar ? (
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-3xl">
                      {currentTestimonial.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Rating */}
                <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                  {renderStars(currentTestimonial.rating)}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-700 text-xl leading-relaxed mb-6 font-medium">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <h3 className="font-bold text-gray-900 text-xl">
                      {currentTestimonial.name}
                    </h3>
                    <a
                      href={currentTestimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                  
                  <div className="text-gray-600 font-medium">
                    {currentTestimonial.title}
                  </div>
                  
                  <div className="text-blue-600 font-semibold">
                    {currentTestimonial.company}
                  </div>
                  
                  {/* Relationship Context */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-semibold text-blue-800">
                      {currentTestimonial.relationship}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      {currentTestimonial.relationshipContext}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {carouselConfig.showArrows && totalTestimonials > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {carouselConfig.showDots && totalTestimonials > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {visibleTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
