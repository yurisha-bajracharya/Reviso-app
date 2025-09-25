import { AppLayout } from "@/components/app-layout"
import { FlashCardManager } from "@/components/flashcard-manager"

export default function FlashCardsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <FlashCardManager />
      </div>
    </AppLayout>
  )
}
