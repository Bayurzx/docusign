import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TitleStepProps {
  formData: { title: string }
  updateFormData: (key: 'title', value: string) => void
  onEnterPress: () => void
}

export function TitleStep({ formData, updateFormData, onEnterPress }: TitleStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Document Title</CardTitle>
        <CardDescription>Give your document a catchy title</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="My Amazing Document"
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2 text-lg"
        />
      </CardContent>
    </Card>
  )
}

