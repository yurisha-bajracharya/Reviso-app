import { AppLayout } from "@/components/app-layout"
import { ResultsManager } from "@/components/results-manager"

export default function ResultsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <ResultsManager />
      </div>
    </AppLayout>
  )
}
