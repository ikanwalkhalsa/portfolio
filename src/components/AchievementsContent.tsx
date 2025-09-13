'use client'

import React, { useState, useEffect } from 'react'
import { 
  Trophy, 
  Medal, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  Code, 
  Brain,
  ExternalLink,
  CheckCircle,
  Star,
  Zap,
  BarChart3,
  AlertCircle
} from 'lucide-react'
import PageLoader from './PageLoader'
import AnimatedCounter from './AnimatedCounter'

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
}

interface Achievement {
  title: string
  description: string
  date: string
  issuer: string
  category: string
}

interface AchievementContent {
  title: string
  subtitle: string
  sections: {
    leetcode: {
      title: string
      description: string
      profileUrl: string
    }
    competitions?: {
      title: string
      description: string
      achievements: Achievement[]
    }
    certifications?: {
      title: string
      description: string
      certifications: Achievement[]
    }
    professional?: {
      title: string
      description: string
      achievements: Achievement[]
    }
    skills?: {
      title: string
      description: string
      skillAreas: SkillArea[]
    }
    linkedin?: {
      title: string
      description: string
      profileUrl: string
      stats: {
        connections: string
        endorsements: string
        recommendations: string
      }
    }
  }
}

interface SkillArea {
  skill: string
  level: number
  validation: string
  description: string
}

interface ContentConfig {
  achievements?: AchievementContent
}

const AchievementsContent: React.FC = () => {
  const [content, setContent] = useState<ContentConfig>({})
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch content and LeetCode stats in parallel
        const [contentResponse, leetCodeResponse] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/leetcode')
        ])

        if (!contentResponse.ok) {
          throw new Error('Failed to fetch content')
        }

        const contentData = await contentResponse.json()
        setContent(contentData)

        if (leetCodeResponse.ok) {
          const leetCodeData = await leetCodeResponse.json()
          setLeetCodeStats(leetCodeData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageLoader message="Loading achievements and LeetCode stats..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <AlertCircle className="h-12 w-12 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Achievements</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const achievements = content.achievements
  if (!achievements) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Achievements Found</h2>
              <p className="text-gray-600">Unable to load achievements data.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Use fetched stats or fallback values
  const stats = leetCodeStats || {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    acceptanceRate: 0,
    ranking: 0
  }

  const statsData = [
    { label: 'Problems Solved', value: stats.totalSolved, icon: Target },
    { label: 'Acceptance Rate', value: typeof stats.acceptanceRate === 'string' ? stats.acceptanceRate : `${stats.acceptanceRate}%`, icon: TrendingUp },
    { label: 'Global Ranking', value: stats.ranking.toLocaleString(), icon: Trophy }
  ]

  const difficultyData = [
    { label: 'Easy', value: stats.easySolved, color: 'bg-green-500', percentage: stats.totalSolved > 0 ? (stats.easySolved / stats.totalSolved * 100) : 0 },
    { label: 'Medium', value: stats.mediumSolved, color: 'bg-yellow-500', percentage: stats.totalSolved > 0 ? (stats.mediumSolved / stats.totalSolved * 100) : 0 },
    { label: 'Hard', value: stats.hardSolved, color: 'bg-red-500', percentage: stats.totalSolved > 0 ? (stats.hardSolved / stats.totalSolved * 100) : 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gray-900">My</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Achievements</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {achievements.subtitle}
            </p>
          </div>

          {/* LeetCode Section */}
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <Code className="h-8 w-8 text-blue-600 mr-3" />
                    {achievements.sections?.leetcode?.title || 'LeetCode Performance'}
                  </h2>
                  <p className="text-gray-600">{achievements.sections?.leetcode?.description || 'Live coding statistics and performance metrics.'}</p>
                </div>
                {achievements.sections?.leetcode?.profileUrl && (
                  <a
                    href={achievements.sections.leetcode.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                  >
                    View Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsData.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      <AnimatedCounter 
                        end={stat.value} 
                        duration={2000}
                        delay={index * 200}
                      />
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Difficulty Breakdown */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
                  Difficulty Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {difficultyData.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.label}</span>
                        <span className="text-2xl font-bold text-gray-900">
                          <AnimatedCounter 
                            end={item.value} 
                            duration={2000}
                            delay={index * 100}
                          />
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.percentage.toFixed(1)}% of total
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Competitions & Awards Section */}
          {achievements.sections?.competitions && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
                  {achievements.sections.competitions.title}
                </h2>
                <p className="text-gray-600 mb-8">{achievements.sections.competitions.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.sections.competitions.achievements?.map((achievement, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Medal className="h-6 w-6 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                            {achievement.category}
                          </span>
                        </div>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{(achievement as any).event || achievement.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{(achievement as any).team || 'Individual'}</span>
                      </div>
                      <div className="mt-2 text-sm font-medium text-green-600">
                        {(achievement as any).result || 'Achievement'}
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {achievements.sections?.certifications && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="h-8 w-8 text-blue-600 mr-3" />
                  {achievements.sections.certifications.title}
                </h2>
                <p className="text-gray-600 mb-8">{achievements.sections.certifications.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.sections.certifications.certifications?.map((cert, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-6 w-6 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {cert.category}
                          </span>
                        </div>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{(cert as any).name || cert.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          )}

          {/* Professional Achievements Section */}
          {achievements.sections?.professional && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="h-8 w-8 text-purple-600 mr-3" />
                  {achievements.sections.professional.title}
                </h2>
                <p className="text-gray-600 mb-8">{achievements.sections.professional.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.sections.professional.achievements?.map((achievement, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Target className="h-6 w-6 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                            {achievement.date}
                          </span>
                        </div>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{(achievement as any).achievement || achievement.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      <div className="mt-2 text-sm font-medium text-green-600">
                        {(achievement as any).impact || achievement.date}
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          )}

          {/* Technical Skills Validation Section */}
          {achievements.sections?.skills && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="h-8 w-8 text-indigo-600 mr-3" />
                  {achievements.sections.skills.title}
                </h2>
                <p className="text-gray-600 mb-8">{achievements.sections.skills.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.sections.skills.skillAreas?.map((skill, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{skill.skill}</h3>
                        <span className="text-2xl font-bold text-indigo-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div 
                          className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{skill.description}</p>
                      <div className="text-sm font-medium text-indigo-600">
                        {skill.validation}
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          )}

          {/* LinkedIn Profile Section */}
          {achievements.sections?.linkedin && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                      <Brain className="h-8 w-8 text-blue-600 mr-3" />
                      {achievements.sections.linkedin.title}
                    </h2>
                    <p className="text-gray-600">{achievements.sections.linkedin.description}</p>
                  </div>
                  {achievements.sections.linkedin.profileUrl && (
                    <a
                      href={achievements.sections.linkedin.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>

                {achievements.sections.linkedin.stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{achievements.sections.linkedin.stats.connections}</div>
                      <div className="text-gray-600">Connections</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{achievements.sections.linkedin.stats.endorsements}</div>
                      <div className="text-gray-600">Skill Endorsements</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{achievements.sections.linkedin.stats.recommendations}</div>
                      <div className="text-gray-600">Recommendations</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AchievementsContent
