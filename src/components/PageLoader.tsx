import React from 'react'

interface PageLoaderProps {
  message?: string
  fullScreen?: boolean
  className?: string
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Loading...", 
  fullScreen = false,
  className = ""
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-gray-50 flex items-center justify-center z-50"
    : "flex flex-col items-center justify-center py-12"

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
    </div>
  )
}

export default PageLoader
