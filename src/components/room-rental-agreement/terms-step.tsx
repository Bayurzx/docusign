import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TermsStepProps {
  formData: {
    terms: {
      startDate: string
      noticePeriod: string
      rent: string
      paymentMethod: string
      paymentDay: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function TermsStep({ formData, updateFormData, onEnterPress }: TermsStepProps) {
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
          Rental Terms
        </CardTitle>
        <CardDescription>Enter the terms of the rental agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-500 mb-1">
            Start Date
          </label>
          <Input
            id="startDate"
            type="date"
            value={formData.terms.startDate}
            onChange={(e) => updateFormData("terms.startDate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-500 mb-1">
            Notice Period
          </label>
          <Input
            id="noticePeriod"
            type="text"
            placeholder="e.g., 30 days"
            value={formData.terms.noticePeriod}
            onChange={(e) => updateFormData("terms.noticePeriod", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="rent" className="block text-sm font-medium text-gray-500 mb-1">
            Rent Amount
          </label>
          <Input
            id="rent"
            type="text"
            placeholder="e.g., 1500"
            value={formData.terms.rent}
            onChange={(e) => updateFormData("terms.rent", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-500 mb-1">
            Payment Method
          </label>
          <Input
            id="paymentMethod"
            type="text"
            placeholder="e.g., Bank Transfer"
            value={formData.terms.paymentMethod}
            onChange={(e) => updateFormData("terms.paymentMethod", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentDay" className="block text-sm font-medium text-gray-500 mb-1">
            Payment Day
          </label>
          <Input
            id="paymentDay"
            type="text"
            placeholder="e.g., 1st of each month"
            value={formData.terms.paymentDay}
            onChange={(e) => updateFormData("terms.paymentDay", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

