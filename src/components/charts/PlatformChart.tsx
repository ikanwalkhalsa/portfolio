'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface PlatformData {
  name: string
  problems: number
  color: string
}

interface PlatformChartProps {
  data: PlatformData[]
}

export default function PlatformChart({ data }: PlatformChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="problems"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
            formatter={(value: number) => [`${value} problems`, 'Solved']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
