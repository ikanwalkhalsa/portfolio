'use client'

import { useEffect } from 'react'
import { config } from '@/lib/config'

/**
 * Analytics Component
 * Handles Google Analytics, Hotjar, and other analytics integrations
 */
export default function Analytics() {
  useEffect(() => {
    // Only load analytics in production and if enabled
    if (!config.features.analytics || config.app.nodeEnv !== 'production') {
      return
    }

    // Google Analytics
    if (config.analytics.googleAnalyticsId) {
      loadGoogleAnalytics(config.analytics.googleAnalyticsId)
    }

    // Hotjar
    if (config.analytics.hotjarId) {
      loadHotjar(config.analytics.hotjarId)
    }

    // Vercel Analytics
    if (config.analytics.vercelAnalyticsId) {
      loadVercelAnalytics()
    }
  }, [])

  return null // This component doesn't render anything
}

function loadGoogleAnalytics(measurementId: string) {
  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  })

  // Track page views on route changes
  const handleRouteChange = () => {
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }

  // Listen for route changes (Next.js specific)
  window.addEventListener('popstate', handleRouteChange)
}

function loadHotjar(hotjarId: string) {
  // Load Hotjar script
  const script = document.createElement('script')
  script.innerHTML = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `
  document.head.appendChild(script)
}

function loadVercelAnalytics() {
  // Vercel Analytics is automatically loaded by Next.js
  // This function can be used for additional configuration
  if (typeof window !== 'undefined' && (window as any).va) {
    console.log('Vercel Analytics loaded')
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    va?: any
  }
}
