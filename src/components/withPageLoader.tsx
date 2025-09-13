'use client'

import React, { useState, useEffect } from 'react'
import PageLoader from './PageLoader'

interface WithPageLoaderOptions {
  loadingMessage?: string
  minLoadingTime?: number
}

function withPageLoader<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithPageLoaderOptions = {}
) {
  const { loadingMessage = "Loading...", minLoadingTime = 500 } = options

  return function WithPageLoaderComponent(props: P) {
    const [isLoading, setIsLoading] = useState(true)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
      // Simulate minimum loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false)
        // Small delay to ensure smooth transition
        setTimeout(() => setShowContent(true), 100)
      }, minLoadingTime)

      return () => clearTimeout(timer)
    }, [])

    if (isLoading || !showContent) {
      return <PageLoader message={loadingMessage} fullScreen />
    }

    return <WrappedComponent {...props} />
  }
}

export default withPageLoader
