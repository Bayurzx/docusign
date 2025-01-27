import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OtherDetailsStepProps {
  formData: {
    date: string
    contract_name: string
    contract_type: string
    jurisdiction: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function OtherDetailsStep({ formData, updateFormData, onEnterPress }: OtherDetailsStepProps) {
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
          Other Details
        </CardTitle>
        <CardDescription>Enter additional details for the confidentiality agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => updateFormData("date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Contract Name"
          value={formData.contract_name}
          onChange={(e) => updateFormData("contract_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Contract Type"
          value={formData.contract_type}
          onChange={(e) => updateFormData("contract_type", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Jurisdiction"
          value={formData.jurisdiction}
          onChange={(e) => updateFormData("jurisdiction", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

