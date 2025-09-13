'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/logger'
import { config } from '@/lib/config'

/**
 * Performance Monitor Component
 * Tracks Core Web Vitals and performance metrics
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    if (!config.features.monitoring) {
      return
    }

    // Track Core Web Vitals
    trackWebVitals()
    
    // Track page load performance
    trackPageLoad()
    
    // Track resource loading performance
    trackResourceTiming()
    
    // Track user interactions
    trackUserInteractions()
  }, [])

  return null // This component doesn't render anything
}

function trackWebVitals() {
  // Track Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      
      logger.performance('LCP', lastEntry.startTime, {
        element: (lastEntry as any).element?.tagName,
        url: (lastEntry as any).url,
      })
    })
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      // LCP not supported
    }
  }

  // Track First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        logger.performance('FID', (entry as any).processingStart - entry.startTime, {
          eventType: entry.name,
          target: (entry as any).target?.tagName,
        })
      })
    })
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      // FID not supported
    }
  }

  // Track Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      })
      
      logger.performance('CLS', clsValue, {
        entries: entries.length,
      })
    })
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      // CLS not supported
    }
  }
}

function trackPageLoad() {
  // Track page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        domProcessing: navigation.domComplete - (navigation as any).domLoading,
      }
      
      logger.performance('Page Load', metrics.totalLoadTime, metrics)
    }
  })
}

function trackResourceTiming() {
  // Track resource loading performance
  if ('PerformanceObserver' in window) {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.duration > 1000) { // Log slow resources (>1s)
          logger.performance('Slow Resource', entry.duration, {
            name: entry.name,
            type: (entry as any).initiatorType,
            size: (entry as any).transferSize,
          })
        }
      })
    })
    
    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (error) {
      // Resource timing not supported
    }
  }
}

function trackUserInteractions() {
  // Track click events
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    logger.business('User Click', {
      tagName: target.tagName,
      className: target.className,
      id: target.id,
      text: target.textContent?.substring(0, 100),
      timestamp: Date.now(),
    })
  })

  // Track form submissions
  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement
    logger.business('Form Submission', {
      action: form.action,
      method: form.method,
      fieldCount: form.elements.length,
      timestamp: Date.now(),
    })
  })

  // Track scroll depth
  let maxScrollDepth = 0
  let scrollTimeout: NodeJS.Timeout

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        
        // Log significant scroll milestones
        if (scrollDepth >= 25 && scrollDepth % 25 === 0) {
          logger.business('Scroll Depth', {
            depth: scrollDepth,
            timestamp: Date.now(),
          })
        }
      }
    }, 100)
  })

  // Track time on page
  const startTime = Date.now()
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Date.now() - startTime
    logger.business('Time on Page', {
      duration: timeOnPage,
      durationSeconds: Math.round(timeOnPage / 1000),
      timestamp: Date.now(),
    })
  })
}
