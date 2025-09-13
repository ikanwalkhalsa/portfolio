import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { config as appConfig } from '@/lib/config'

export function middleware(request: NextRequest) {
  const startTime = Date.now()
  const response = NextResponse.next()

  // Add security headers
  if (appConfig.security.secureHeaders) {
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  }

  // Add performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // Rate limiting (basic implementation)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  // Log request
  logger.info('HTTP Request', {
    method: request.method,
    url: request.url,
    ip,
    userAgent,
    timestamp: new Date().toISOString(),
  })

  // Add request ID for tracking
  const requestId = crypto.randomUUID()
  response.headers.set('X-Request-ID', requestId)

  // Performance monitoring
  const responseTime = Date.now() - startTime
  if (responseTime > 1000) { // Log slow requests
    logger.warn('Slow request detected', {
      method: request.method,
      url: request.url,
      responseTime,
      requestId,
    })
  }

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', appConfig.app.url)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
