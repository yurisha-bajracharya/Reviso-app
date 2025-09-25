"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentUploadProps {
  onUpload: (files: File[]) => void
}

interface UploadFile {
  file: File
  progress: number
  status: "uploading" | "complete" | "error"
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(Array.from(e.dataTransfer.files))
      }
    },
    [onUpload],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        handleFiles(Array.from(e.target.files))
      }
    },
    [onUpload],
  )

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB limit
    })

    if (validFiles.length === 0) {
      alert("Please upload valid document files (PDF, DOC, DOCX, TXT) under 10MB")
      return
    }

    const newUploadFiles = validFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }))

    setUploadFiles(newUploadFiles)

    // Simulate upload progress
    newUploadFiles.forEach((uploadFile, index) => {
      const interval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((f, i) => {
            if (i === index && f.progress < 100) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "complete" : "uploading",
              }
            }
            return f
          }),
        )
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setUploadFiles((prev) => prev.map((f, i) => (i === index ? { ...f, progress: 100, status: "complete" } : f)))
      }, 2000)
    })

    onUpload(validFiles)
  }

  const removeFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload your study materials (PDF, DOC, DOCX, TXT) to ask questions about their content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop your documents here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files (PDF, DOC, DOCX, TXT - max 10MB each)
                </p>
              </div>
              <Button variant="outline">Choose Files</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadFiles.map((uploadFile, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {uploadFile.status === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{uploadFile.file.name}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Progress value={uploadFile.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {uploadFile.status === "complete"
                          ? "Upload complete"
                          : `${Math.round(uploadFile.progress)}% uploaded`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
