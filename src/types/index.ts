// Project types
export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  problem: string
  solution: string
  impact: string
  stack: string[]
  technologies: string[]
  links: {
    repo: string | null
    demo: string | null
  }
  images: string[]
  status: 'completed' | 'in-progress' | 'planned'
  date: string
  duration: string
  team: string
}

// Achievement types
export interface Rating {
  date: string
  platform: 'codeforces' | 'leetcode' | 'codechef' | 'hackerrank'
  rating: number
  contest: string
}

export interface Badge {
  event: string
  result: string
  category: string
  team: string
  date: string
  description: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credential_id: string
  verification_url: string
}

export interface AchievementStats {
  total_problems_solved: number
  codeforces_problems: number
  leetcode_problems: number
  contests_participated: number
  hackathons_won: number
  years_programming: number
  years_ml_experience: number
}

export interface Achievements {
  ratings: Rating[]
  badges: Badge[]
  certifications: Certification[]
  statistics: AchievementStats
}

// Skills types
export interface Skill {
  name: string
  level: number
  years: number
  description: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Language {
  name: string
  proficiency: string
  level: number
}

export interface Skills {
  categories: SkillCategory[]
  expertise_areas: string[]
  languages: Language[]
}

// Experience types
export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
  technologies: string[]
  type: 'full-time' | 'contract' | 'freelance' | 'internship'
}

// Contact types
export interface ContactInfo {
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string | null
}

// Resume Chat types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: string[]
}

export interface ResumeChunk {
  id: string
  content: string
  source: string
  type: 'experience' | 'project' | 'skill' | 'achievement' | 'education'
  metadata: Record<string, any>
}
