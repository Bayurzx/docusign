import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentStepProps {
  formData: {
    payment: {
      total_amount: string
      schedule: {
        initial_payment: {
          date: string
          amount: string
        }
        first_payment: {
          date: string
          amount: string
        }
        second_payment: {
          date: string
          amount: string
        }
        final_payment: {
          date: string
          amount: string
        }
      }
      late_payment_interest: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function PaymentStep({ formData, updateFormData, onEnterPress }: PaymentStepProps) {
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
          Payment Details
        </CardTitle>
        <CardDescription>Enter the payment details for the agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Total Amount"
          value={formData.payment.total_amount}
          onChange={(e) => updateFormData("payment.total_amount", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="initial-payment-date" className="block text-sm font-medium text-gray-500">
              Initial Payment Date
            </label>
            <Input
              id="initial-payment-date"
              type="date"
              value={formData.payment.schedule.initial_payment.date}
              onChange={(e) => updateFormData("payment.schedule.initial_payment.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Input
            type="text"
            placeholder="Initial Payment Amount"
            value={formData.payment.schedule.initial_payment.amount}
            onChange={(e) => updateFormData("payment.schedule.initial_payment.amount", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-payment-date" className="block text-sm font-medium text-gray-500">
              First Payment Date
            </label>
            <Input
              id="first-payment-date"
              type="date"
              value={formData.payment.schedule.first_payment.date}
              onChange={(e) => updateFormData("payment.schedule.first_payment.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Input
            type="text"
            placeholder="First Payment Amount"
            value={formData.payment.schedule.first_payment.amount}
            onChange={(e) => updateFormData("payment.schedule.first_payment.amount", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="second-payment-date" className="block text-sm font-medium text-gray-500">
              Second Payment Date
            </label>
            <Input
              id="second-payment-date"
              type="date"
              value={formData.payment.schedule.second_payment.date}
              onChange={(e) => updateFormData("payment.schedule.second_payment.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Input
            type="text"
            placeholder="Second Payment Amount"
            value={formData.payment.schedule.second_payment.amount}
            onChange={(e) => updateFormData("payment.schedule.second_payment.amount", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="final-payment-date" className="block text-sm font-medium text-gray-500">
              Final Payment Date
            </label>
            <Input
              id="final-payment-date"
              type="date"
              value={formData.payment.schedule.final_payment.date}
              onChange={(e) => updateFormData("payment.schedule.final_payment.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Input
            type="text"
            placeholder="Final Payment Amount"
            value={formData.payment.schedule.final_payment.amount}
            onChange={(e) => updateFormData("payment.schedule.final_payment.amount", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Input
          type="text"
          placeholder="Late Payment Interest (%)"
          value={formData.payment.late_payment_interest}
          onChange={(e) => updateFormData("payment.late_payment_interest", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

