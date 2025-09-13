import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { config } from '@/lib/config'
import { getMetrics, formatUptime } from '@/lib/metrics'

export async function GET() {
  const startTime = Date.now()
  
  try {
    const metrics = getMetrics()
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

