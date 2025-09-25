import { AppLayout } from "@/components/app-layout"
import { ChatInterface } from "@/components/chat-interface"

export default function HomePage() {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)]">
        <ChatInterface />
      </div>
    </AppLayout>
  )
}
