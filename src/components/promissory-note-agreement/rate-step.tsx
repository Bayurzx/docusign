import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RateStepProps {
  formData: {
    principalSum: string
    principalSumInWriting: string
    interestRate: string
    interestRateInNumber: string
    paymentDue: {
      day: string
      month: string
      year: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function RateStep({ formData, updateFormData, onEnterPress }: RateStepProps) {
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
          Rate and Payment Information
        </CardTitle>
        <CardDescription>Enter the details for the principal sum, interest rate, and payment due date</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="principalSum" className="block text-sm font-medium text-gray-700 mb-1">
            Principal Sum
          </label>
          <Input
            id="principalSum"
            type="text"
            placeholder="e.g., 5000"
            value={formData.principalSum}
            onChange={(e) => updateFormData("principalSum", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="principalSumInWriting" className="block text-sm font-medium text-gray-700 mb-1">
            Principal Sum in Writing
          </label>
          <Input
            id="principalSumInWriting"
            type="text"
            placeholder="e.g., Five thousand dollars"
            value={formData.principalSumInWriting}
            onChange={(e) => updateFormData("principalSumInWriting", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate
          </label>
          <Input
            id="interestRate"
            type="text"
            placeholder="e.g., 5%"
            value={formData.interestRate}
            onChange={(e) => updateFormData("interestRate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="interestRateInNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate in Number
          </label>
          <Input
            id="interestRateInNumber"
            type="text"
            placeholder="e.g., 5"
            value={formData.interestRateInNumber}
            onChange={(e) => updateFormData("interestRateInNumber", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentDueDay" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Due Day
          </label>
          <Input
            id="paymentDueDay"
            type="text"
            placeholder="e.g., 15"
            value={formData.paymentDue.day}
            onChange={(e) => updateFormData("paymentDue.day", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentDueMonth" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Due Month
          </label>
          <Input
            id="paymentDueMonth"
            type="text"
            placeholder="e.g., 02"
            value={formData.paymentDue.month}
            onChange={(e) => updateFormData("paymentDue.month", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentDueYear" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Due Year
          </label>
          <Input
            id="paymentDueYear"
            type="text"
            placeholder="e.g., 2025"
            value={formData.paymentDue.year}
            onChange={(e) => updateFormData("paymentDue.year", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

