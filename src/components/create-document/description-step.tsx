import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DescriptionStepProps {
  formData: { description: string }
  updateFormData: (key: 'description', value: string) => void
  onEnterPress: () => void
}

export function DescriptionStep({ formData, updateFormData, onEnterPress }: DescriptionStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Add Description</CardTitle>
        <CardDescription>Describe what this document is about</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Share what this document is about..."
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2 min-h-[120px]"
        />
      </CardContent>
    </Card>
  )
}

