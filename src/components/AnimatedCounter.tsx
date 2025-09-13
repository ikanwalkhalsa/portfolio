'use client'

import React, { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  end: number | string
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/[^\d.-]/g, '')) : end
      const start = 0
      const increment = numericEnd / (duration / 16) // 60fps
      let current = start

      const counter = setInterval(() => {
        current += increment
        if (current >= numericEnd) {
          setCount(numericEnd)
          clearInterval(counter)
        } else {
          setCount(current)
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, end, duration, delay])

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    
    return Math.floor(num).toString()
  }

  const displayValue = typeof end === 'string' && end.includes('%') 
    ? formatNumber(count) + '%'
    : typeof end === 'string' && end.includes('+')
    ? formatNumber(count) + '+'
    : formatNumber(count)

  return (
    <span ref={counterRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

export default AnimatedCounter
