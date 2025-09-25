"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { PerformanceChart } from "@/components/performance-chart"
import { DetailedResults } from "@/components/detailed-results"
import { TrendingUp, TrendingDown, Trophy, Target, Calendar, BarChart3, FileText, Brain } from "lucide-react"

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

const testResults: TestResult[] = [
  {
    id: "1",
    title: "Data Structures Fundamentals",
    type: "mcq",
    subject: "Data Structures",
    score: 85,
    maxScore: 100,
    date: new Date("2024-01-15"),
    duration: 45,
    questionsTotal: 30,
    questionsCorrect: 26,
    difficulty: "medium",
    timeSpent: 42,
  },
  {
    id: "2",
    title: "Algorithm Analysis",
    type: "written",
    subject: "Algorithms",
    score: 78,
    maxScore: 100,
    date: new Date("2024-01-14"),
    duration: 90,
    questionsTotal: 5,
    questionsCorrect: 4,
    difficulty: "hard",
    timeSpent: 87,
  },
  {
    id: "3",
    title: "Network Protocols Study Session",
    type: "flashcard",
    subject: "Computer Networks",
    score: 92,
    maxScore: 100,
    date: new Date("2024-01-13"),
    duration: 30,
    questionsTotal: 38,
    questionsCorrect: 35,
    difficulty: "medium",
    timeSpent: 28,
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    type: "mcq",
    subject: "Operating Systems",
    score: 72,
    maxScore: 100,
    date: new Date("2024-01-12"),
    duration: 60,
    questionsTotal: 40,
    questionsCorrect: 29,
    difficulty: "hard",
    timeSpent: 58,
  },
  {
    id: "5",
    title: "Database Design",
    type: "written",
    subject: "Databases",
    score: 88,
    maxScore: 100,
    date: new Date("2024-01-11"),
    duration: 75,
    questionsTotal: 6,
    questionsCorrect: 5,
    difficulty: "medium",
    timeSpent: 73,
  },
]

export function ResultsManager() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null)

  const subjects = Array.from(new Set(testResults.map((result) => result.subject)))

  const filteredResults = testResults.filter((result) => {
    if (selectedSubject !== "all" && result.subject !== selectedSubject) return false
    if (selectedPeriod !== "all") {
      const now = new Date()
      const resultDate = result.date
      switch (selectedPeriod) {
        case "week":
          return now.getTime() - resultDate.getTime() <= 7 * 24 * 60 * 60 * 1000
        case "month":
          return now.getTime() - resultDate.getTime() <= 30 * 24 * 60 * 60 * 1000
        case "3months":
          return now.getTime() - resultDate.getTime() <= 90 * 24 * 60 * 60 * 1000
      }
    }
    return true
  })

  const averageScore =
    filteredResults.length > 0
      ? filteredResults.reduce((sum, result) => sum + result.score, 0) / filteredResults.length
      : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: "default" as const, text: "Excellent" }
    if (score >= 80) return { variant: "secondary" as const, text: "Good" }
    if (score >= 60) return { variant: "outline" as const, text: "Fair" }
    return { variant: "destructive" as const, text: "Needs Work" }
  }

  if (selectedResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedResult.title}</h1>
            <p className="text-muted-foreground">{selectedResult.subject}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedResult(null)}>
            Back to Results
          </Button>
        </div>
        <DetailedResults result={selectedResult} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Results & Evaluation</h1>
        <p className="text-muted-foreground text-pretty">
          Track your performance and analyze your learning progress across all study activities
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{Math.round(averageScore)}%</div>
                <p className="text-xs text-muted-foreground">
                  {averageScore > 75 ? (
                    <span className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Above target
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Below target
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredResults.length}</div>
                <p className="text-xs text-muted-foreground">
                  {filteredResults.filter((r) => r.type === "mcq").length} MCQ,{" "}
                  {filteredResults.filter((r) => r.type === "written").length} Written,{" "}
                  {filteredResults.filter((r) => r.type === "flashcard").length} Flash Cards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(filteredResults.reduce((sum, result) => sum + result.timeSpent, 0) / 60)}h
                </div>
                <p className="text-xs text-muted-foreground">Total time spent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+12%</div>
                <p className="text-xs text-muted-foreground">Since last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your score progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart results={filteredResults} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedResult(result)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          {result.type === "mcq" ? (
                            <Target className="h-5 w-5 text-primary" />
                          ) : result.type === "written" ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <Brain className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{result.title}</h3>
                          <p className="text-sm text-muted-foreground">{result.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{result.date.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{result.timeSpent} min</span>
                        <span>•</span>
                        <span>
                          {result.questionsCorrect}/{result.questionsTotal} correct
                        </span>
                        <Badge
                          variant={
                            result.difficulty === "easy"
                              ? "default"
                              : result.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {result.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</div>
                      <Badge {...getScoreBadge(result.score)}>{getScoreBadge(result.score).text}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject) => {
                  const subjectResults = filteredResults.filter((r) => r.subject === subject)
                  const avgScore = subjectResults.reduce((sum, r) => sum + r.score, 0) / subjectResults.length
                  return (
                    <div key={subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject}</span>
                        <span className={`font-bold ${getScoreColor(avgScore)}`}>{Math.round(avgScore)}%</span>
                      </div>
                      <Progress value={avgScore} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Type Performance</CardTitle>
                <CardDescription>How you perform across different test types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["mcq", "written", "flashcard"].map((type) => {
                  const typeResults = filteredResults.filter((r) => r.type === type)
                  if (typeResults.length === 0) return null
                  const avgScore = typeResults.reduce((sum, r) => sum + r.score, 0) / typeResults.length
                  const typeName = type === "mcq" ? "MCQ Tests" : type === "written" ? "Written Tests" : "Flash Cards"
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{typeName}</span>
                        <span className={`font-bold ${getScoreColor(avgScore)}`}>{Math.round(avgScore)}%</span>
                      </div>
                      <Progress value={avgScore} className="h-2" />
                      <p className="text-xs text-muted-foreground">{typeResults.length} tests completed</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Study Insights</CardTitle>
              <CardDescription>AI-powered insights about your learning patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Strong Performance in Data Structures</p>
                    <p className="text-sm text-muted-foreground">
                      You consistently score above 80% in data structure topics. Keep up the excellent work!
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    !
                  </div>
                  <div>
                    <p className="font-medium">Focus Area: Operating Systems</p>
                    <p className="text-sm text-muted-foreground">
                      Your OS scores are below average. Consider reviewing process management and memory allocation
                      concepts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    i
                  </div>
                  <div>
                    <p className="font-medium">Study Pattern</p>
                    <p className="text-sm text-muted-foreground">
                      You perform better on tests taken in the morning. Consider scheduling important exams earlier in
                      the day.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
