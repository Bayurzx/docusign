import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractStepProps {
  formData: {
    date: string
    contractName: string
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
        <CardDescription>Enter the details for the subscription agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Agreement Date
          </label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p className="text-sm text-gray-500 mt-1">Enter the date when this agreement is being signed.</p>
        </div>
        <div>
          <label htmlFor="contractName" className="block text-sm font-medium text-gray-700 mb-1">
            Contract Name
          </label>
          <Input
            id="contractName"
            type="text"
            placeholder="e.g., Subscription Agreement"
            value={formData.contractName}
            onChange={(e) => updateFormData("contractName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

