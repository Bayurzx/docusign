import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CCStepProps {
  formData: {
    ccEmail: string
    ccName: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function CCStep({ formData, updateFormData, onEnterPress }: CCStepProps) {
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
          CC Information
        </CardTitle>
        <CardDescription>Enter the details for the CC recipient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="CC Email"
          value={formData.ccEmail}
          onChange={(e) => updateFormData("ccEmail", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="CC Name"
          value={formData.ccName}
          onChange={(e) => updateFormData("ccName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

