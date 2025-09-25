"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText, Save } from "lucide-react"

interface ExamTemplate {
  id: string
  title: string
  subject: string
  type: "mcq" | "written" | "mixed"
  duration: number
  questions: number
  difficulty: "easy" | "medium" | "hard"
  description: string
}

interface WrittenQuestion {
  id: string
  question: string
  points: number
  expectedLength: string
  sampleAnswer?: string
}

interface WrittenTestProps {
  exam: ExamTemplate
  onComplete: () => void
}

const sampleQuestions: WrittenQuestion[] = [
  {
    id: "1",
    question:
      "Explain the concept of dynamic programming and provide an example of a problem that can be solved using this technique. Include the recursive relation and discuss the time complexity improvement.",
    points: 20,
    expectedLength: "300-400 words",
    sampleAnswer:
      "Dynamic programming is an optimization technique that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations...",
  },
  {
    id: "2",
    question:
      "Compare and contrast different sorting algorithms (Quick Sort, Merge Sort, Heap Sort). Discuss their time complexities, space complexities, and when you would choose one over the others.",
    points: 25,
    expectedLength: "400-500 words",
  },
  {
    id: "3",
    question:
      "Describe the process of handling deadlocks in operating systems. What are the four necessary conditions for deadlock? Explain at least two deadlock prevention strategies.",
    points: 20,
    expectedLength: "300-400 words",
  },
  {
    id: "4",
    question:
      "Design a database schema for a university management system. Include at least 5 entities with their relationships. Explain your normalization decisions and provide sample SQL queries.",
    points: 25,
    expectedLength: "400-500 words",
  },
  {
    id: "5",
    question:
      "Explain the TCP three-way handshake process. Why is it necessary? What happens if one of the steps fails? Include a diagram or detailed description of the packet exchange.",
    points: 10,
    expectedLength: "200-300 words",
  },
]

export function WrittenTest({ exam, onComplete }: WrittenTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (answers[sampleQuestions[currentQuestion].id]) {
        setAutoSaved(true)
        setTimeout(() => setAutoSaved(false), 2000)
      }
    }, 5000)

    return () => clearTimeout(autoSaveTimer)
  }, [answers, currentQuestion])

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsCompleted(true)
    setShowResults(true)
  }

  const getWordCount = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showResults) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Test Submitted!</CardTitle>
          <CardDescription>Your answers have been recorded for evaluation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-lg mb-4">
              <Badge variant="default" className="text-lg px-4 py-2">
                Submitted Successfully
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Your written test has been submitted and will be evaluated by the AI system. Results will be available in
              the Results section.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Answer Summary:</h3>
            {sampleQuestions.map((question, index) => {
              const answer = answers[question.id] || ""
              const wordCount = getWordCount(answer)
              return (
                <Card key={question.id} className="p-4">
                  <div className="space-y-2">
                    <p className="font-medium">
                      Question {index + 1} ({question.points} points)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Word count: {wordCount} words
                      {answer ? " ✓ Answered" : " ⚠ Not answered"}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={onComplete}>Back to Exams</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100
  const question = sampleQuestions[currentQuestion]
  const currentAnswer = answers[question.id] || ""
  const wordCount = getWordCount(currentAnswer)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </CardTitle>
              <CardDescription>{exam.subject} - Written Test</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              {autoSaved && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Save className="h-4 w-4" />
                  <span className="text-sm">Auto-saved</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 600 ? "text-red-600" : ""}`}>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{question.question}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Badge variant="outline">{question.points} points</Badge>
                <span>Expected length: {question.expectedLength}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[300px] resize-none"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Word count: {wordCount}</span>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Auto-save enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <div className="flex space-x-2">
          {currentQuestion === sampleQuestions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Test</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </div>
  )
}
