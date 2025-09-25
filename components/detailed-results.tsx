"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Target, CheckCircle, XCircle } from "lucide-react"

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

interface DetailedResultsProps {
  result: TestResult
}

// Mock detailed question data
const mockQuestionDetails = [
  {
    id: "1",
    question: "What is the time complexity of binary search?",
    userAnswer: "O(log n)",
    correctAnswer: "O(log n)",
    isCorrect: true,
    explanation:
      "Binary search eliminates half of the remaining elements in each step, resulting in logarithmic time complexity.",
  },
  {
    id: "2",
    question: "Which data structure uses LIFO principle?",
    userAnswer: "Queue",
    correctAnswer: "Stack",
    isCorrect: false,
    explanation: "Stack follows LIFO (Last In, First Out) principle, while Queue follows FIFO (First In, First Out).",
  },
  {
    id: "3",
    question: "What is the worst-case time complexity of QuickSort?",
    userAnswer: "O(n²)",
    correctAnswer: "O(n²)",
    isCorrect: true,
    explanation: "QuickSort has O(n²) worst-case complexity when the pivot is always the smallest or largest element.",
  },
]

export function DetailedResults({ result }: DetailedResultsProps) {
  const accuracy = (result.questionsCorrect / result.questionsTotal) * 100
  const timeEfficiency = ((result.duration - result.timeSpent) / result.duration) * 100

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

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{result.title}</CardTitle>
              <CardDescription>
                {result.subject} • {result.date.toLocaleDateString()} • {result.type.toUpperCase()}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</div>
              <Badge {...getScoreBadge(result.score)}>{getScoreBadge(result.score).text}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Accuracy</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{Math.round(accuracy)}%</span>
                  <span className="text-sm text-muted-foreground">
                    {result.questionsCorrect}/{result.questionsTotal}
                  </span>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Management</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{result.timeSpent}m</span>
                  <span className="text-sm text-muted-foreground">of {result.duration}m</span>
                </div>
                <Progress value={(result.timeSpent / result.duration) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium">Difficulty</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {result.difficulty === "easy" && "Basic concepts and fundamental knowledge"}
                {result.difficulty === "medium" && "Intermediate application and analysis"}
                {result.difficulty === "hard" && "Advanced problem-solving and synthesis"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Breakdown (for MCQ tests) */}
      {result.type === "mcq" && (
        <Card>
          <CardHeader>
            <CardTitle>Question Breakdown</CardTitle>
            <CardDescription>Detailed analysis of your answers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockQuestionDetails.map((question, index) => (
                <Card key={question.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    {question.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                      </p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Your answer:</span>
                          <span className={question.isCorrect ? "text-green-600" : "text-red-600"}>
                            {question.userAnswer}
                          </span>
                        </div>
                        {!question.isCorrect && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Correct answer:</span>
                            <span className="text-green-600">{question.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">{question.explanation}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-generated feedback and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">✓</div>
              <div>
                <p className="font-medium">Strong Areas</p>
                <p className="text-sm text-muted-foreground">
                  You demonstrated excellent understanding of time complexity analysis and basic data structure
                  operations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                !
              </div>
              <div>
                <p className="font-medium">Areas for Improvement</p>
                <p className="text-sm text-muted-foreground">
                  Review the differences between stack and queue data structures. Practice more problems involving LIFO
                  vs FIFO concepts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">i</div>
              <div>
                <p className="font-medium">Study Recommendations</p>
                <p className="text-sm text-muted-foreground">
                  Focus on practical implementation of data structures. Try coding exercises to reinforce theoretical
                  knowledge.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
