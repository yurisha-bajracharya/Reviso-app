"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentChat } from "@/components/document-chat"
import { FileText, MessageSquare, Search, Download, Trash2, Eye } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: Date
  status: "processing" | "ready" | "error"
  pages?: number
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Data Structures and Algorithms.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: new Date("2024-01-15"),
    status: "ready",
    pages: 45,
  },
  {
    id: "2",
    name: "Computer Networks Lecture Notes.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadDate: new Date("2024-01-14"),
    status: "ready",
    pages: 32,
  },
  {
    id: "3",
    name: "Operating Systems Concepts.pdf",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: new Date("2024-01-13"),
    status: "processing",
    pages: 67,
  },
]

export function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDocumentSelect = (document: Document) => {
    if (document.status === "ready") {
      setSelectedDocument(document)
    }
  }

  const handleDocumentUpload = (files: File[]) => {
    const newDocuments = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      uploadDate: new Date(),
      status: "processing" as const,
    }))

    setDocuments((prev) => [...newDocuments, ...prev])

    // Simulate processing
    newDocuments.forEach((doc) => {
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === doc.id ? { ...d, status: "ready", pages: Math.floor(Math.random() * 50) + 10 } : d,
          ),
        )
      }, 3000)
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Document Library</h1>
        <p className="text-muted-foreground text-pretty">
          Upload your study materials and ask questions about their content
        </p>
      </div>

      <Tabs defaultValue="library" className="space-y-4">
        <TabsList>
          <TabsTrigger value="library">Document Library</TabsTrigger>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          {selectedDocument && <TabsTrigger value="chat">Chat with Document</TabsTrigger>}
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Documents</CardTitle>
                  <CardDescription>Manage and search through your uploaded study materials</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[250px] pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {filteredDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{document.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{document.type}</span>
                            <span>•</span>
                            <span>{document.size}</span>
                            {document.pages && (
                              <>
                                <span>•</span>
                                <span>{document.pages} pages</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{document.uploadDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            document.status === "ready"
                              ? "default"
                              : document.status === "processing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {document.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDocumentSelect(document)}
                          disabled={document.status !== "ready"}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <DocumentUpload onUpload={handleDocumentUpload} />
        </TabsContent>

        {selectedDocument && (
          <TabsContent value="chat">
            <DocumentChat document={selectedDocument} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
