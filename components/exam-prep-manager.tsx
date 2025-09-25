"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MCQTest } from "@/components/mcq-test"
import { WrittenTest } from "@/components/written-test"
import { Clock, BookOpen, PenTool, Trophy, Target, TrendingUp } from "lucide-react"

interface ExamTemplate {
  id: string
  title: string
  subject: string
  type: "mcq" | "written" | "mixed"
  duration: number
  questions: number
  difficulty: "easy" | "medium" | "hard"
  description: string
  lastAttempt?: Date
  bestScore?: number
}

const examTemplates: ExamTemplate[] = [
  {
    id: "1",
    title: "Data Structures Fundamentals",
    subject: "Data Structures",
    type: "mcq",
    duration: 45,
    questions: 30,
    difficulty: "medium",
    description: "Test your knowledge of arrays, linked lists, stacks, and queues",
    lastAttempt: new Date("2024-01-10"),
    bestScore: 85,
  },
  {
    id: "2",
    title: "Algorithm Analysis",
    subject: "Algorithms",
    type: "written",
    duration: 90,
    questions: 5,
    difficulty: "hard",
    description: "Analyze time complexity and solve algorithmic problems",
    bestScore: 78,
  },
  {
    id: "3",
    title: "Computer Networks Basics",
    subject: "Networks",
    type: "mcq",
    duration: 60,
    questions: 40,
    difficulty: "easy",
    description: "OSI model, TCP/IP, and network protocols",
    lastAttempt: new Date("2024-01-12"),
    bestScore: 92,
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    subject: "Operating Systems",
    type: "mixed",
    duration: 120,
    questions: 25,
    difficulty: "hard",
    description: "Process management, memory allocation, and file systems",
  },
  {
    id: "5",
    title: "Database Design",
    subject: "Databases",
    type: "written",
    duration: 75,
    questions: 6,
    difficulty: "medium",
    description: "Normalization, ER diagrams, and SQL queries",
    bestScore: 88,
  },
]

export function ExamPrepManager() {
  const [selectedExam, setSelectedExam] = useState<ExamTemplate | null>(null)
  const [activeTest, setActiveTest] = useState<"mcq" | "written" | null>(null)

  const handleStartExam = (exam: ExamTemplate) => {
    setSelectedExam(exam)
    if (exam.type === "mixed") {
      // For mixed exams, default to MCQ first
      setActiveTest("mcq")
    } else {
      setActiveTest(exam.type)
    }
  }

  const handleBackToExams = () => {
    setSelectedExam(null)
    setActiveTest(null)
  }

  if (selectedExam && activeTest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedExam.title}</h1>
            <p className="text-muted-foreground">{selectedExam.subject}</p>
          </div>
          <Button variant="outline" onClick={handleBackToExams}>
            Back to Exams
          </Button>
        </div>

        {activeTest === "mcq" && <MCQTest exam={selectedExam} onComplete={handleBackToExams} />}
        {activeTest === "written" && <WrittenTest exam={selectedExam} onComplete={handleBackToExams} />}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Exam Preparation</h1>
        <p className="text-muted-foreground text-pretty">
          Practice with MCQ tests and written exams to prepare for your computer engineering assessments
        </p>
      </div>

      <Tabs defaultValue="practice" className="space-y-4">
        <TabsList>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examTemplates.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <CardDescription>{exam.subject}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        exam.difficulty === "easy"
                          ? "default"
                          : exam.difficulty === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {exam.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{exam.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {exam.type === "mcq" ? (
                        <Target className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <PenTool className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{exam.questions} questions</span>
                    </div>
                  </div>

                  {exam.bestScore && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Best Score:</span>
                      <Badge variant="outline">{exam.bestScore}%</Badge>
                    </div>
                  )}

                  {exam.lastAttempt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Attempt:</span>
                      <span>{exam.lastAttempt.toLocaleDateString()}</span>
                    </div>
                  )}

                  <Button className="w-full" onClick={() => handleStartExam(exam)}>
                    Start {exam.type === "mcq" ? "MCQ Test" : exam.type === "written" ? "Written Test" : "Mixed Test"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84%</div>
                <p className="text-xs text-muted-foreground">+6% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">Since last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>Your performance on recent practice tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examTemplates
                  .filter((exam) => exam.bestScore)
                  .map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">{exam.subject}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            exam.bestScore! >= 80 ? "default" : exam.bestScore! >= 60 ? "secondary" : "destructive"
                          }
                        >
                          {exam.bestScore}%
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
