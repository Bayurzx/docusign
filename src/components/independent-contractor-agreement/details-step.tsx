import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DetailsStepProps {
  formData: {
    subject: string
    scope_of_work: string
    term: {
      duration: string
      start_date: string
      end_date: string
    }
    termination: {
      notice_period_days: number
    }
  }
  updateFormData: (key: string, value: string | number) => void
  onEnterPress: () => void
}

export function DetailsStep({ formData, updateFormData, onEnterPress }: DetailsStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Agreement Details
        </CardTitle>
        <CardDescription>Enter the details of the independent contractor agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => updateFormData("subject", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Textarea
          placeholder="Scope of Work"
          value={formData.scope_of_work}
          onChange={(e) => updateFormData("scope_of_work", e.target.value)}
          rows={4}
        />
        <Input
          type="text"
          placeholder="Duration"
          value={formData.term.duration}
          onChange={(e) => updateFormData("term.duration", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="space-y-2">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-500">
            Start Date of Agreement
          </label>
          <Input
            id="start-date"
            type="date"
            value={formData.term.start_date}
            onChange={(e) => updateFormData("term.start_date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-500">
            End Date of Agreement
          </label>
          <Input
            id="end-date"
            type="date"
            value={formData.term.end_date}
            onChange={(e) => updateFormData("term.end_date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Input
          type="number"
          placeholder="Notice Period (days)"
          value={formData.termination.notice_period_days}
          onChange={(e) => updateFormData("termination.notice_period_days", Number.parseInt(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

