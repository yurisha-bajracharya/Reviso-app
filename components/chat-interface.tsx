"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, BookOpen, Code, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const suggestedQuestions = [
  {
    icon: BookOpen,
    text: "Explain binary search trees",
    category: "Data Structures",
  },
  {
    icon: Code,
    text: "How does dynamic programming work?",
    category: "Algorithms",
  },
  {
    icon: Database,
    text: "What is database normalization?",
    category: "Databases",
  },
  {
    icon: Sparkles,
    text: "Explain TCP vs UDP protocols",
    category: "Networks",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI study assistant for computer engineering. I can help you understand complex concepts, solve problems, and prepare for exams. What would you like to learn about today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you're asking about " +
          input +
          ". This is a placeholder response. In the actual implementation, this would connect to your AI API to provide detailed explanations and help with computer engineering concepts.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-muted/10 p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-sm sm:text-base truncate">AI Study Assistant</h2>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Computer Engineering Tutor</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2 sm:space-x-3",
                message.role === "user" && "flex-row-reverse space-x-reverse",
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full shrink-0",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {message.role === "user" ? (
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
              <Card
                className={cn(
                  "max-w-[85%] sm:max-w-[80%]",
                  message.role === "user" && "bg-primary text-primary-foreground",
                )}
              >
                <CardContent className="p-2 sm:p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <Card className="max-w-[85%] sm:max-w-[80%]">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="border-t p-3 sm:p-4">
          <h3 className="mb-2 sm:mb-3 text-sm font-medium text-muted-foreground">Suggested Questions</h3>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto justify-start p-2 sm:p-3 text-left bg-transparent"
                onClick={() => handleSuggestedQuestion(question.text)}
              >
                <question.icon className="mr-2 h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm truncate">{question.text}</div>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {question.category}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t p-3 sm:p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about computer engineering..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            className="text-sm sm:text-base"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          AI can make mistakes. Verify important information and use multiple sources for critical topics.
        </p>
      </div>
    </div>
  )
}
