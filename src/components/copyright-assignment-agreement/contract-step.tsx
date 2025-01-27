import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractStepProps {
  formData: {
    contract: {
      name: string
      current_date: string
      governing_law: string
      jurisdiction: string
      execution_date: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ContractStep({ formData, updateFormData, onEnterPress }: ContractStepProps) {
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
          Contract Information
        </CardTitle>
        <CardDescription>Enter the details for the copyright assignment agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Contract Name"
          value={formData.contract.name}
          onChange={(e) => updateFormData("contract.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Current Date"
          value={formData.contract.current_date}
          onChange={(e) => updateFormData("contract.current_date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Governing Law"
          value={formData.contract.governing_law}
          onChange={(e) => updateFormData("contract.governing_law", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Jurisdiction"
          value={formData.contract.jurisdiction}
          onChange={(e) => updateFormData("contract.jurisdiction", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Execution Date"
          value={formData.contract.execution_date}
          onChange={(e) => updateFormData("contract.execution_date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

