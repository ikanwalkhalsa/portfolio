import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Try to fetch from LeetCode stats API
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/kanwalpreetsingh', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (response.ok) {
      const data = await response.json()
              const leetCodeResponse = NextResponse.json({
                totalSolved: data.totalSolved || 0,
                totalQuestions: data.totalQuestions || 0,
                acceptanceRate: `${(data.acceptanceRate || 0).toFixed(2)}%`,
                ranking: data.ranking || 0,
                contributionPoints: data.contributionPoints || 0,
                reputation: data.reputation || 0,
                easySolved: data.easySolved || 0,
                mediumSolved: data.mediumSolved || 0,
                hardSolved: data.hardSolved || 0
              })
      
      // Disable caching in development for live updates
      if (process.env.NODE_ENV === 'development') {
        leetCodeResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        leetCodeResponse.headers.set('Pragma', 'no-cache')
        leetCodeResponse.headers.set('Expires', '0')
      }
      
      return leetCodeResponse
    }
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error)
  }
  
  // Fallback to default stats if API fails
  const fallbackResponse = NextResponse.json({
    totalSolved: 1250,
    totalQuestions: 2800,
    acceptanceRate: "90%+",
    ranking: 50000,
    contributionPoints: 100,
    reputation: 100,
    easySolved: 400,
    mediumSolved: 700,
    hardSolved: 150
  })
  
  // Disable caching in development for live updates
  if (process.env.NODE_ENV === 'development') {
    fallbackResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    fallbackResponse.headers.set('Pragma', 'no-cache')
    fallbackResponse.headers.set('Expires', '0')
  }
  
  return fallbackResponse
}
