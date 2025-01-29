import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractStepProps {
  formData: {
    contractName?: string
    purposeOfTheWork?: string
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
        <CardDescription>Enter the details for the non-disclosure agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="contractName" className="block text-sm font-medium text-gray-500 mb-1">
            Contract Name
          </label>
          <Input
            id="contractName"
            type="text"
            placeholder="e.g., Non-Disclosure Agreement"
            value={formData.contractName}
            onChange={(e) => updateFormData("contractName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="purposeOfTheWork" className="block text-sm font-medium text-gray-500 mb-1">
            Purpose of the Work
          </label>
          <Textarea
            id="purposeOfTheWork"
            placeholder="Describe the purpose of sharing confidential information"
            value={formData.purposeOfTheWork}
            onChange={(e) => updateFormData("purposeOfTheWork", e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}

