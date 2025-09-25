"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TestResult {
  id: string
  title: string
  type: "mcq" | "written" | "flashcard"
  subject: string
  score: number
  maxScore: number
  date: Date
  duration: number
  questionsTotal: number
  questionsCorrect: number
  difficulty: "easy" | "medium" | "hard"
  timeSpent: number
}

interface PerformanceChartProps {
  results: TestResult[]
}

export function PerformanceChart({ results }: PerformanceChartProps) {
  const chartData = results
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((result) => ({
      date: result.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: result.score,
      title: result.title,
    }))

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis domain={[0, 100]} className="text-xs" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm">
                      <span className="font-medium">Score: </span>
                      {payload[0].value}%
                    </p>
                    <p className="text-xs text-muted-foreground">{payload[0].payload.title}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
