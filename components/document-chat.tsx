"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, FileText, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: Date
  status: "processing" | "ready" | "error"
  pages?: number
}

interface DocumentChatProps {
  document: Document
}

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  citations?: Array<{
    page: number
    text: string
  }>
}

export function DocumentChat({ document }: DocumentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: `I'm ready to answer questions about "${document.name}". I can help you understand concepts, find specific information, and explain complex topics from this document. What would you like to know?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with citations (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Based on the content in "${document.name}", here's what I found about your question: "${input}". This is a placeholder response that would contain detailed information extracted from your document. The actual implementation would use document processing and retrieval to provide accurate, contextual answers.`,
        role: "assistant",
        timestamp: new Date(),
        citations: [
          {
            page: Math.floor(Math.random() * (document.pages || 10)) + 1,
            text: "This is a sample citation from the document that supports the answer provided.",
          },
          {
            page: Math.floor(Math.random() * (document.pages || 10)) + 1,
            text: "Another relevant excerpt that provides additional context for the response.",
          },
        ],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Chat with Document</CardTitle>
              <CardDescription>{document.name}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-medium">Document Assistant</span>
            </div>
            <Badge variant="outline">{document.pages} pages</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3",
                    message.role === "user" && "flex-row-reverse space-x-reverse",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn("max-w-[80%] space-y-2")}>
                    <Card className={cn(message.role === "user" && "bg-primary text-primary-foreground")}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                        <p className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </CardContent>
                    </Card>

                    {message.citations && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                        {message.citations.map((citation, index) => (
                          <Card key={index} className="bg-muted/50">
                            <CardContent className="p-3">
                              <div className="flex items-start space-x-2">
                                <Quote className="h-3 w-3 mt-0.5 text-muted-foreground" />
                                <div className="space-y-1">
                                  <p className="text-xs">{citation.text}</p>
                                  <Badge variant="outline" className="text-xs">
                                    Page {citation.page}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="max-w-[80%]">
                    <CardContent className="p-3">
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

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask a question about ${document.name}...`}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Responses are based on the content of your uploaded document.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
