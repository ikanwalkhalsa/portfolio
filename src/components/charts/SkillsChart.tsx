'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

interface SkillsData {
  skill: string
  level: number
}

interface SkillsChartProps {
  data: SkillsData[]
}

export default function SkillsChart({ data }: SkillsChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <Radar
            name="Level"
            dataKey="level"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
            formatter={(value: number) => [`${value}%`, 'Proficiency']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
