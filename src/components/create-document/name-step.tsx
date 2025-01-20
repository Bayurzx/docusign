import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NameStepProps {
  formData: { name: string }
  updateFormData: (key: 'name', value: string) => void
  onEnterPress: () => void
}

export function NameStep({ formData, updateFormData, onEnterPress }: NameStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-gradient-to-r from-blue-500 to-purple-500 min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Add Your Name</CardTitle>
        <CardDescription>Let's start with your name</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Jack Spade"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2"
        />
      </CardContent>
    </Card>
  )
}

