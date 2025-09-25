"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Bell, User, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-accent/50 shrink-0"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
              <Image
                src="/reviso-logo.png"
                alt="Reviso Logo"
                fill
                className="object-contain dark:brightness-0 dark:invert"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gradient-primary">Reviso</h1>
              <p className="text-xs text-muted-foreground -mt-1">Study Smart</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 ml-2 sm:ml-4">
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anything..."
                className="w-full pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/50">
            <Search className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-accent/50 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent/50">
              <User className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
