"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlashCardDeck } from "@/components/flashcard-deck"
import { FlashCardStudy } from "@/components/flashcard-study"
import { CreateFlashCardDialog } from "@/components/create-flashcard-dialog"
import { Plus, BookOpen, Brain, Clock, TrendingUp, Search } from "lucide-react"

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

const flashCardSets: FlashCardSet[] = [
  {
    id: "1",
    title: "Data Structures Fundamentals",
    subject: "Data Structures",
    cardCount: 45,
    studiedToday: 12,
    masteredCards: 32,
    difficulty: "medium",
    lastStudied: new Date("2024-01-15"),
    created: new Date("2024-01-10"),
    description: "Arrays, linked lists, stacks, queues, and basic operations",
  },
  {
    id: "2",
    title: "Algorithm Complexity",
    subject: "Algorithms",
    cardCount: 30,
    studiedToday: 8,
    masteredCards: 18,
    difficulty: "hard",
    lastStudied: new Date("2024-01-14"),
    created: new Date("2024-01-08"),
    description: "Big O notation, time and space complexity analysis",
  },
  {
    id: "3",
    title: "Network Protocols",
    subject: "Computer Networks",
    cardCount: 38,
    studiedToday: 0,
    masteredCards: 25,
    difficulty: "medium",
    lastStudied: new Date("2024-01-12"),
    created: new Date("2024-01-05"),
    description: "TCP/IP, HTTP, DNS, and network layer protocols",
  },
  {
    id: "4",
    title: "Operating System Concepts",
    subject: "Operating Systems",
    cardCount: 52,
    studiedToday: 15,
    masteredCards: 28,
    difficulty: "hard",
    lastStudied: new Date("2024-01-15"),
    created: new Date("2024-01-03"),
    description: "Process management, memory allocation, file systems",
  },
  {
    id: "5",
    title: "Database Normalization",
    subject: "Databases",
    cardCount: 25,
    studiedToday: 5,
    masteredCards: 20,
    difficulty: "easy",
    lastStudied: new Date("2024-01-13"),
    created: new Date("2024-01-07"),
    description: "Normal forms, ER diagrams, and database design principles",
  },
]

export function FlashCardManager() {
  const [selectedSet, setSelectedSet] = useState<FlashCardSet | null>(null)
  const [studyMode, setStudyMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const filteredSets = flashCardSets.filter(
    (set) =>
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStudySet = (set: FlashCardSet) => {
    setSelectedSet(set)
    setStudyMode(true)
  }

  const handleViewDeck = (set: FlashCardSet) => {
    setSelectedSet(set)
    setStudyMode(false)
  }

  const handleBackToSets = () => {
    setSelectedSet(null)
    setStudyMode(false)
  }

  if (selectedSet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedSet.title}</h1>
            <p className="text-muted-foreground">{selectedSet.subject}</p>
          </div>
          <Button variant="outline" onClick={handleBackToSets}>
            Back to Flash Cards
          </Button>
        </div>

        {studyMode ? (
          <FlashCardStudy flashCardSet={selectedSet} onComplete={handleBackToSets} />
        ) : (
          <FlashCardDeck flashCardSet={selectedSet} onStartStudy={() => setStudyMode(true)} />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Flash Cards</h1>
        <p className="text-muted-foreground text-pretty">
          Create and study flash cards to reinforce your computer engineering knowledge
        </p>
      </div>

      <Tabs defaultValue="study" className="space-y-4">
        <TabsList>
          <TabsTrigger value="study">Study Sets</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flash card sets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Set
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSets.map((set) => (
              <Card key={set.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{set.title}</CardTitle>
                      <CardDescription>{set.subject}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        set.difficulty === "easy"
                          ? "default"
                          : set.difficulty === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {set.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{set.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Cards:</span>
                        <span>{set.cardCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Mastered:</span>
                        <span>{set.masteredCards}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Today:</span>
                        <span>{set.studiedToday}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Progress:</span>
                        <span>{Math.round((set.masteredCards / set.cardCount) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  {set.lastStudied && (
                    <div className="text-xs text-muted-foreground">
                      Last studied: {set.lastStudied.toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button className="flex-1" onClick={() => handleStudySet(set)}>
                      <Brain className="h-4 w-4 mr-2" />
                      Study
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleViewDeck(set)}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cards Studied Today</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {flashCardSets.reduce((sum, set) => sum + set.studiedToday, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Across all sets</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{flashCardSets.reduce((sum, set) => sum + set.cardCount, 0)}</div>
                <p className="text-xs text-muted-foreground">In {flashCardSets.length} sets</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mastered Cards</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {flashCardSets.reduce((sum, set) => sum + set.masteredCards, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (flashCardSets.reduce((sum, set) => sum + set.masteredCards, 0) /
                      flashCardSets.reduce((sum, set) => sum + set.cardCount, 0)) *
                      100,
                  )}
                  % overall progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Set Progress</CardTitle>
              <CardDescription>Your progress across different flash card sets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flashCardSets.map((set) => {
                  const progress = (set.masteredCards / set.cardCount) * 100
                  return (
                    <div key={set.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{set.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {set.masteredCards} of {set.cardCount} cards mastered
                          </p>
                        </div>
                        <Badge variant="outline">{Math.round(progress)}%</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateFlashCardDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
