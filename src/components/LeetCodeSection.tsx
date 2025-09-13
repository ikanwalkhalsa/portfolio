import React from 'react'
import { Code, TrendingUp, Award, Zap, Target, Trophy } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

const LeetCodeSection = async () => {
  // Direct API call to fetch LeetCode stats
  let leetCodeStats = null
  
  try {
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/kanwalpreetsingh', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (response.ok) {
      const data = await response.json()
      leetCodeStats = {
        totalSolved: data.totalSolved || 0,
        totalQuestions: data.totalQuestions || 0,
        acceptanceRate: `${(data.acceptanceRate || 0).toFixed(2)}%`,
        ranking: data.ranking || 0,
        contributionPoints: data.contributionPoints || 0,
        reputation: data.reputation || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0
      }
    }
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error)
  }
  
  // Fallback to default stats if API fails
  if (!leetCodeStats) {
    leetCodeStats = {
      totalSolved: 1250,
      totalQuestions: 2800,
      acceptanceRate: "90%+",
      ranking: 50000,
      contributionPoints: 100,
      reputation: 100,
      easySolved: 400,
      mediumSolved: 700,
      hardSolved: 150
    }
  }

  const stats = [
    {
      icon: <Target className="h-8 w-8" />,
      label: "Problems Solved",
      value: leetCodeStats?.totalSolved || 0,
      color: "text-blue-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      label: "Acceptance Rate",
      value: leetCodeStats?.acceptanceRate || "0%",
      color: "text-green-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      label: "LeetCode Ranking",
      value: leetCodeStats?.ranking ? Math.round(leetCodeStats.ranking / 1000) + 'K' : "0K",
      color: "text-purple-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      label: "Easy Solved",
      value: leetCodeStats?.easySolved || 0,
      color: "text-green-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      label: "Medium Solved",
      value: leetCodeStats?.mediumSolved || 0,
      color: "text-yellow-600"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      label: "Hard Solved",
      value: leetCodeStats?.hardSolved || 0,
      color: "text-red-600"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LeetCode Statistics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My coding journey and problem-solving achievements on LeetCode
          </p>
          <div className="mt-6">
            <a
              href="https://leetcode.com/u/kanwalpreetsingh/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Code className="h-5 w-5 mr-2" />
              View My LeetCode Profile
            </a>
          </div>
        </div>

        {/* 3x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center border border-gray-100 hover:border-gray-200"
            >
              <div className={`${stat.color} mb-4 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={2000}
                  delay={index * 200}
                />
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LeetCodeSection
