"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageSquare, FileText, GraduationCap, CreditCard, TrendingUp, Target } from "lucide-react"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance text-gradient-hero">
            Welcome back to Reviso
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-pretty">
            Your AI-powered study companion for computer engineering success
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Study Streak</CardTitle>
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-gradient-primary">12 days</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Topics Mastered</CardTitle>
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-gradient-primary">24</div>
              <p className="text-xs text-muted-foreground">+4 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Practice Tests</CardTitle>
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-gradient-primary">8</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-gradient-primary">87%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-gradient-primary text-lg sm:text-xl">Current Study Progress</CardTitle>
              <CardDescription className="text-sm">Your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Structures</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-secondary/20" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Algorithms</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2 bg-secondary/20" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Computer Networks</span>
                  <span className="text-sm text-muted-foreground">91%</span>
                </div>
                <Progress value={91} className="h-2 bg-secondary/20" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Operating Systems</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-gradient-primary text-lg sm:text-xl">Recent Activity</CardTitle>
              <CardDescription className="text-sm">Your latest study sessions and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-gradient shrink-0">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium truncate">Completed AI Chat Session</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="secondary" className="bg-gradient-secondary glass-effect shrink-0">
                  New
                </Badge>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-gradient shrink-0">
                  <GraduationCap className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium truncate">Aced Algorithms Quiz</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <Badge variant="outline" className="glass-effect border-primary/30 shrink-0">
                  95%
                </Badge>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-gradient shrink-0">
                  <CreditCard className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium truncate">Reviewed 50 Flash Cards</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card glass-effect border-border/20 shadow-gradient">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-gradient-primary text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Jump into your study session</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Button
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 bg-gradient-secondary glass-effect border-border/20 hover:bg-gradient-accent transition-all duration-300"
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Start AI Chat</span>
              </Button>

              <Button
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 bg-gradient-secondary glass-effect border-border/20 hover:bg-gradient-accent transition-all duration-300"
                variant="outline"
                onClick={() => (window.location.href = "/documents")}
              >
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Upload Document</span>
              </Button>

              <Button
                className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 bg-gradient-secondary glass-effect border-border/20 hover:bg-gradient-accent transition-all duration-300 sm:col-span-2 lg:col-span-1"
                variant="outline"
                onClick={() => (window.location.href = "/exam-prep")}
              >
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Take Practice Test</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
