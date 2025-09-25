"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RotateCcw, CheckCircle, XCircle, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashCardSet {
  id: string
  title: string
  subject: string
  cardCount: number
  studiedToday: number
  masteredCards: number
  difficulty: "easy" | "medium" | "hard"
  lastStudied?: Date
  created: Date
  description: string
}

interface FlashCard {
  id: string
  front: string
  back: string
  difficulty: "easy" | "medium" | "hard"
  mastered: boolean
  lastReviewed?: Date
}

interface FlashCardStudyProps {
  flashCardSet: FlashCardSet
  onComplete: () => void
}

const sampleCards: FlashCard[] = [
  {
    id: "1",
    front: "What is the time complexity of binary search?",
    back: "O(log n) - Binary search eliminates half of the remaining elements in each step, resulting in logarithmic time complexity.",
    difficulty: "medium",
    mastered: false,
  },
  {
    id: "2",
    front: "Define a stack data structure",
    back: "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the same end called the 'top' of the stack.",
    difficulty: "easy",
    mastered: true,
  },
  {
    id: "3",
    front: "What is dynamic programming?",
    back: "Dynamic programming is an optimization technique that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations.",
    difficulty: "hard",
    mastered: false,
  },
  {
    id: "4",
    front: "Explain the difference between BFS and DFS",
    back: "BFS (Breadth-First Search) explores nodes level by level using a queue, while DFS (Depth-First Search) explores as far as possible along each branch using a stack or recursion.",
    difficulty: "medium",
    mastered: false,
  },
  {
    id: "5",
    front: "What is a hash collision?",
    back: "A hash collision occurs when two different keys produce the same hash value, requiring collision resolution techniques like chaining or open addressing.",
    difficulty: "medium",
    mastered: true,
  },
]

export function FlashCardStudy({ flashCardSet, onComplete }: FlashCardStudyProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set())
  const [correctCards, setCorrectCards] = useState<Set<string>>(new Set())
  const [incorrectCards, setIncorrectCards] = useState<Set<string>>(new Set())
  const [sessionComplete, setSessionComplete] = useState(false)

  const currentCard = sampleCards[currentCardIndex]
  const progress = (studiedCards.size / sampleCards.length) * 100

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleResponse = (correct: boolean) => {
    const cardId = currentCard.id
    setStudiedCards((prev) => new Set([...prev, cardId]))

    if (correct) {
      setCorrectCards((prev) => new Set([...prev, cardId]))
      setIncorrectCards((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cardId)
        return newSet
      })
    } else {
      setIncorrectCards((prev) => new Set([...prev, cardId]))
      setCorrectCards((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cardId)
        return newSet
      })
    }

    // Move to next card or complete session
    if (currentCardIndex < sampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else {
      setSessionComplete(true)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleNextCard = () => {
    if (currentCardIndex < sampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setStudiedCards(new Set())
    setCorrectCards(new Set())
    setIncorrectCards(new Set())
    setSessionComplete(false)
  }

  if (sessionComplete) {
    const accuracy = studiedCards.size > 0 ? (correctCards.size / studiedCards.size) * 100 : 0

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Study Session Complete!</h2>
              <p className="text-muted-foreground">Great job studying {flashCardSet.title}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">{correctCards.size}</div>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-red-600">{incorrectCards.size}</div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{Math.round(accuracy)}%</div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={handleRestart} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Study Again
              </Button>
              <Button onClick={onComplete}>Complete Session</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="font-semibold">
                Card {currentCardIndex + 1} of {sampleCards.length}
              </h2>
              <p className="text-sm text-muted-foreground">
                {studiedCards.size} studied • {correctCards.size} correct • {incorrectCards.size} incorrect
              </p>
            </div>
            <Badge
              variant={
                currentCard.difficulty === "easy"
                  ? "default"
                  : currentCard.difficulty === "medium"
                    ? "secondary"
                    : "destructive"
              }
            >
              {currentCard.difficulty}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Flash Card */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Card
            className={cn(
              "min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-lg",
              isFlipped && "bg-muted/50",
            )}
            onClick={handleCardFlip}
          >
            <CardContent className="p-8 flex items-center justify-center text-center h-full min-h-[400px]">
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-center mb-4">
                  {isFlipped ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-muted-foreground">{isFlipped ? "Answer" : "Question"}</h3>
                  <p className="text-xl leading-relaxed">{isFlipped ? currentCard.back : currentCard.front}</p>
                </div>
                {!isFlipped && <p className="text-sm text-muted-foreground mt-6">Click to reveal answer</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePreviousCard} disabled={currentCardIndex === 0}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => handleResponse(false)} className="text-red-600 border-red-200">
              <XCircle className="h-4 w-4 mr-2" />
              Incorrect
            </Button>
            <Button onClick={() => handleResponse(true)} className="text-green-600 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              Correct
            </Button>
          </div>
        )}

        <Button variant="outline" onClick={handleNextCard} disabled={currentCardIndex === sampleCards.length - 1}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {!isFlipped && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Review the question, then click the card to see the answer</p>
        </div>
      )}
    </div>
  )
}
