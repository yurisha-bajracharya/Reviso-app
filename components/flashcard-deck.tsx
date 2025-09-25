"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, Edit, Trash2, Brain } from "lucide-react"

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

interface FlashCardDeckProps {
  flashCardSet: FlashCardSet
  onStartStudy: () => void
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

export function FlashCardDeck({ flashCardSet, onStartStudy }: FlashCardDeckProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<FlashCard | null>(null)

  const filteredCards = sampleCards.filter(
    (card) =>
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Deck Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{flashCardSet.title}</CardTitle>
              <CardDescription>{flashCardSet.description}</CardDescription>
            </div>
            <Button onClick={onStartStudy}>
              <Brain className="h-4 w-4 mr-2" />
              Start Studying
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{flashCardSet.cardCount}</div>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{flashCardSet.masteredCards}</div>
              <p className="text-sm text-muted-foreground">Mastered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{flashCardSet.studiedToday}</div>
              <p className="text-sm text-muted-foreground">Studied Today</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((flashCardSet.masteredCards / flashCardSet.cardCount) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Flash Cards</CardTitle>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {filteredCards.map((card, index) => (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedCard?.id === card.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <Badge
                            variant={
                              card.difficulty === "easy"
                                ? "default"
                                : card.difficulty === "medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {card.difficulty}
                          </Badge>
                          {card.mastered && <Badge variant="outline">Mastered</Badge>}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{card.front}</p>
                          {selectedCard?.id === card.id && (
                            <div className="pt-2 border-t">
                              <p className="text-sm text-muted-foreground">{card.back}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
