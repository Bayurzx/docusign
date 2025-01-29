import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DetailsStepProps {
  formData: {
    projectName: string
    legal: {
      governingState: string
      arbitrationBody: string
      arbitrationLocation: string
    }
  }
  updateFormData: (key: string, value: string) => void
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
        <CardDescription>Enter the details of the intellectual property agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) => updateFormData("projectName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Governing laws of the State of..."
          value={formData.legal.governingState}
          onChange={(e) => updateFormData("legal.governingState", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Arbitration Body(Disputes shall be resolved by...)"
          value={formData.legal.arbitrationBody}
          onChange={(e) => updateFormData("legal.arbitrationBody", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Arbitration Location"
          value={formData.legal.arbitrationLocation}
          onChange={(e) => updateFormData("legal.arbitrationLocation", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

