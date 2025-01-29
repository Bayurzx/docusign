import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LegalClosingStepProps {
  formData: {
    closing: {
      date: string
    }
    legal: {
      stateCountry: string
      jurisdiction: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function LegalClosingStep({ formData, updateFormData, onEnterPress }: LegalClosingStepProps) {
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
          Legal & Closing Information
        </CardTitle>
        <CardDescription>Enter the legal and closing details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="closingDate" className="block text-sm font-medium text-gray-500 mb-1">
            Closing Date
          </label>
          <Input
            id="closingDate"
            type="date"
            value={formData.closing.date}
            onChange={(e) => updateFormData("closing.date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p className="text-sm text-gray-500 mt-1">Enter the date when the transaction is expected to be completed.</p>
        </div>
        <div>
          <label htmlFor="stateCountry" className="block text-sm font-medium text-gray-500 mb-1">
            State/Country
          </label>
          <Input
            id="stateCountry"
            type="text"
            placeholder="e.g., Delaware, USA"
            value={formData.legal.stateCountry}
            onChange={(e) => updateFormData("legal.stateCountry", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-500 mb-1">
            Jurisdiction
          </label>
          <Input
            id="jurisdiction"
            type="text"
            placeholder="e.g., State of Delaware"
            value={formData.legal.jurisdiction}
            onChange={(e) => updateFormData("legal.jurisdiction", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

