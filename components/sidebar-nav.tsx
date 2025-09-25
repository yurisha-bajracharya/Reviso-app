"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MessageSquare, FileText, GraduationCap, CreditCard, BarChart3, Home } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Chat",
    href: "/",
    icon: MessageSquare,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Exam Prep",
    href: "/exam-prep",
    icon: GraduationCap,
  },
  {
    name: "Flash Cards",
    href: "/flashcards",
    icon: CreditCard,
  },
  {
    name: "Results",
    href: "/results",
    icon: BarChart3,
  },
]

interface SidebarNavProps {
  collapsed?: boolean
}

export function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <nav className="flex flex-col space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href

          const linkContent = (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-gradient-secondary hover:text-accent-foreground hover:shadow-md",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary-foreground")} />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {isActive && !collapsed && <div className="ml-auto h-2 w-2 rounded-full bg-primary-foreground/80"></div>}
            </Link>
          )

          if (collapsed) {
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            )
          }

          return linkContent
        })}
      </nav>
    </TooltipProvider>
  )
}
