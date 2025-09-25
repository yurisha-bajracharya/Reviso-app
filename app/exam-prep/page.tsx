import { AppLayout } from "@/components/app-layout"
import { ExamPrepManager } from "@/components/exam-prep-manager"

export default function ExamPrepPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <ExamPrepManager />
      </div>
    </AppLayout>
  )
}
