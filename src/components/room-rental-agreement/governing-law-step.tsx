import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GoverningLawStepProps {
  formData: {
    governingLaw: {
      state: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function GoverningLawStep({ formData, updateFormData, onEnterPress }: GoverningLawStepProps) {
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
          Governing Law
        </CardTitle>
        <CardDescription>Enter the state governing this agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="governingState" className="block text-sm font-medium text-gray-700 mb-1">
            Governing State
          </label>
          <Input
            id="governingState"
            type="text"
            placeholder="e.g., California"
            value={formData.governingLaw.state}
            onChange={(e) => updateFormData("governingLaw.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

