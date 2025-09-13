import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { config } from '@/lib/config'

// Simple in-memory metrics storage
// In production, you'd want to use a proper metrics service like Prometheus, DataDog, etc.
const metrics = {
  requests: {
    total: 0,
    successful: 0,
    failed: 0,
  },
  responseTime: {
    total: 0,
    count: 0,
    average: 0,
  },
  errors: {
    total: 0,
    byType: {} as Record<string, number>,
  },
  memory: {
    peak: 0,
    current: 0,
  },
  uptime: {
    start: Date.now(),
  },
}

export function updateMetrics(type: 'request' | 'response' | 'error', data?: any) {
  switch (type) {
    case 'request':
      metrics.requests.total++
      if (data?.success) {
        metrics.requests.successful++
      } else {
        metrics.requests.failed++
      }
      break
    
    case 'response':
      if (data?.responseTime) {
        metrics.responseTime.total += data.responseTime
        metrics.responseTime.count++
        metrics.responseTime.average = metrics.responseTime.total / metrics.responseTime.count
      }
      break
    
    case 'error':
      metrics.errors.total++
      const errorType = data?.type || 'unknown'
      metrics.errors.byType[errorType] = (metrics.errors.byType[errorType] || 0) + 1
      break
  }

  // Update memory metrics
  const memUsage = process.memoryUsage()
  metrics.memory.current = Math.round(memUsage.heapUsed / 1024 / 1024)
  if (metrics.memory.current > metrics.memory.peak) {
    metrics.memory.peak = metrics.memory.current
  }
}

export async function GET() {
  const startTime = Date.now()
  
  try {
    const currentTime = Date.now()
    const uptime = currentTime - metrics.uptime.start
    
    const metricsData = {
      timestamp: new Date().toISOString(),
      version: config.app.version,
      environment: config.app.nodeEnv,
      uptime: {
        seconds: Math.floor(uptime / 1000),
        formatted: formatUptime(uptime),
      },
      requests: {
        ...metrics.requests,
        successRate: metrics.requests.total > 0 
          ? Math.round((metrics.requests.successful / metrics.requests.total) * 100) 
          : 0,
      },
      performance: {
        responseTime: {
          ...metrics.responseTime,
          average: Math.round(metrics.responseTime.average),
        },
        memory: {
          ...metrics.memory,
          system: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            external: Math.round(process.memoryUsage().external / 1024 / 1024),
            rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
          },
        },
      },
      errors: metrics.errors,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        cpuUsage: process.cpuUsage(),
      },
    }

    const responseTime = Date.now() - startTime
    
    logger.info('Metrics requested', {
      responseTime,
      metricsRequested: true,
    })

    return NextResponse.json(metricsData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logger.error('Metrics endpoint failed', {
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }
}

function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}
