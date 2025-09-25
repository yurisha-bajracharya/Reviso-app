import { AppLayout } from "@/components/app-layout"
import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)]">
        <ChatInterface />
      </div>
    </AppLayout>
  )
}
