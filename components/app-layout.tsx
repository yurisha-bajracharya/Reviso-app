"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-main">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out",
            "border-r border-border/20 bg-gradient-sidebar glass-effect",
            sidebarOpen ? "w-64 translate-x-0" : "w-16 -translate-x-0",
            "top-16", // Account for header height
            // Mobile overlay
            isMobile && sidebarOpen && "shadow-2xl",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto p-2 sm:p-4">
              <SidebarNav collapsed={!sidebarOpen} />
            </div>
          </div>
        </aside>

        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)]",
            sidebarOpen && !isMobile ? "ml-64" : !sidebarOpen ? "ml-16" : "ml-0",
            "p-4 sm:p-6",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
