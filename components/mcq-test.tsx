"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

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

interface MCQQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface MCQTestProps {
  exam: ExamTemplate
  onComplete: () => void
}

const sampleQuestions: MCQQuestion[] = [
  {
    id: "1",
    question: "What is the time complexity of searching in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "In a balanced BST, the height is log n, so search operations take O(log n) time.",
  },
  {
    id: "2",
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
  },
  {
    id: "3",
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation: "QuickSort has O(n²) worst-case complexity when the pivot is always the smallest or largest element.",
  },
  {
    id: "4",
    question: "In a hash table, what is the purpose of a hash function?",
    options: ["To sort the data", "To map keys to array indices", "To encrypt the data", "To compress the data"],
    correctAnswer: 1,
    explanation:
      "A hash function maps keys to array indices to determine where to store or find data in the hash table.",
  },
  {
    id: "5",
    question: "Which traversal method visits nodes in a binary tree level by level?",
    options: ["Inorder", "Preorder", "Postorder", "Level-order"],
    correctAnswer: 3,
    explanation: "Level-order traversal (BFS) visits all nodes at each level before moving to the next level.",
  },
]

export function MCQTest({ exam, onComplete }: MCQTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60) // Convert to seconds
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
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

  const calculateScore = () => {
    let correct = 0
    sampleQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / sampleQuestions.length) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Test Completed!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{score}%</div>
            <Badge
              variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4 py-1"
            >
              {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Question Review:</h3>
            {sampleQuestions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer
              return (
                <Card key={question.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : userAnswer !== undefined ? (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Your answer:</span>{" "}
                          {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                        </p>
                        <p>
                          <span className="font-medium">Correct answer:</span>{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={onComplete}>Back to Exams</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retake Test
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100
  const question = sampleQuestions[currentQuestion]

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
              <CardDescription>{exam.subject} - MCQ Test</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 300 ? "text-red-600" : ""}`}>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
