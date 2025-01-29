import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SubscriptionStepProps {
  formData: {
    subscription: {
      numberOfShares: string
      purchasePrice: string
      paymentPeriod: string
      deliveryPeriod: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function SubscriptionStep({ formData, updateFormData, onEnterPress }: SubscriptionStepProps) {
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
          Subscription Details
        </CardTitle>
        <CardDescription>Enter the details for the subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="numberOfShares" className="block text-sm font-medium text-gray-500 mb-1">
            Number of Shares
          </label>
          <Input
            id="numberOfShares"
            type="text"
            placeholder="e.g., 100"
            value={formData.subscription.numberOfShares}
            onChange={(e) => updateFormData("subscription.numberOfShares", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-500 mb-1">
            Purchase Price per Share
          </label>
          <Input
            id="purchasePrice"
            type="text"
            placeholder="e.g., 10.00"
            value={formData.subscription.purchasePrice}
            onChange={(e) => updateFormData("subscription.purchasePrice", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="paymentPeriod" className="block text-sm font-medium text-gray-500 mb-1">
            Payment Period
          </label>
          <Input
            id="paymentPeriod"
            type="text"
            placeholder="e.g., 30 days"
            value={formData.subscription.paymentPeriod}
            onChange={(e) => updateFormData("subscription.paymentPeriod", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="deliveryPeriod" className="block text-sm font-medium text-gray-500 mb-1">
            Delivery Period
          </label>
          <Input
            id="deliveryPeriod"
            type="text"
            placeholder="e.g., 14 days"
            value={formData.subscription.deliveryPeriod}
            onChange={(e) => updateFormData("subscription.deliveryPeriod", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

