import { AppLayout } from "@/components/app-layout"
import { DocumentManager } from "@/components/document-manager"

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <DocumentManager />
      </div>
    </AppLayout>
  )
}
