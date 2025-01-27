import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OthersStepProps {
  formData: {
    deliveryDays: string
    terminationNoticeDays: string
    remedyPeriodDays: string
    paymentTermDays: string
    interestRate: string
    warrantyPeriod: string
    governingState: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function OthersStep({ formData, updateFormData, onEnterPress }: OthersStepProps) {
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
        <CardDescription>Enter additional agreement details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Delivery Days"
          value={formData.deliveryDays}
          onChange={(e) => updateFormData("deliveryDays", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Termination Notice Days"
          value={formData.terminationNoticeDays}
          onChange={(e) => updateFormData("terminationNoticeDays", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Remedy Period Days"
          value={formData.remedyPeriodDays}
          onChange={(e) => updateFormData("remedyPeriodDays", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Payment Term Days"
          value={formData.paymentTermDays}
          onChange={(e) => updateFormData("paymentTermDays", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Interest Rate"
          value={formData.interestRate}
          onChange={(e) => updateFormData("interestRate", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Warranty Period (months)"
          value={formData.warrantyPeriod}
          onChange={(e) => updateFormData("warrantyPeriod", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Governing State"
          value={formData.governingState}
          onChange={(e) => updateFormData("governingState", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

