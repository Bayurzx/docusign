import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WorkStepProps {
  formData: {
    work: {
      name: string
      description: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function WorkStep({ formData, updateFormData, onEnterPress }: WorkStepProps) {
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
          Work Information
        </CardTitle>
        <CardDescription>Enter the details of the work being assigned</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Work Name"
          value={formData.work.name}
          onChange={(e) => updateFormData("work.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Textarea
          placeholder="Work Description"
          value={formData.work.description}
          onChange={(e) => updateFormData("work.description", e.target.value)}
          rows={4}
        />
      </CardContent>
    </Card>
  )
}

