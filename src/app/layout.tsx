import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import { config } from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
  keywords: ['Machine Learning', 'AI', 'Computer Vision', 'Data Engineering', 'Portfolio', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Kanwalpreet Singh' }],
  creator: 'Kanwalpreet Singh',
  publisher: 'Kanwalpreet Singh',
  robots: 'index, follow',
  openGraph: {
    title: config.app.name,
    description: config.app.description,
    type: 'website',
    url: config.app.url,
    siteName: config.app.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.app.name,
    description: config.app.description,
    creator: '@kanwalpreet_dev',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href="https://leetcode-stats-api.herokuapp.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        
        {/* Performance hints */}
        <link rel="preload" href="/profile-image.jpg" as="image" type="image/jpeg" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
