import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TermsStepProps {
  formData: {
    terms: {
      jurisdiction: string
      duration: string
      payment_method: string
      amount: string
      late_fee: string
      penalty: string
      time_period: string
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
          Terms and Conditions
        </CardTitle>
        <CardDescription>Enter the terms and conditions for the consulting agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Jurisdiction"
          value={formData.terms.jurisdiction}
          onChange={(e) => updateFormData("terms.jurisdiction", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Duration"
          value={formData.terms.duration}
          onChange={(e) => updateFormData("terms.duration", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Payment Method"
          value={formData.terms.payment_method}
          onChange={(e) => updateFormData("terms.payment_method", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Amount"
          value={formData.terms.amount}
          onChange={(e) => updateFormData("terms.amount", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Late Fee"
          value={formData.terms.late_fee}
          onChange={(e) => updateFormData("terms.late_fee", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Penalty"
          value={formData.terms.penalty}
          onChange={(e) => updateFormData("terms.penalty", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Time Period"
          value={formData.terms.time_period}
          onChange={(e) => updateFormData("terms.time_period", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

