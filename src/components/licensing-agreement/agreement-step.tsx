import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AgreementStepProps {
  formData: {
    agreement: {
      executionDate: string
      governingState: string
      termDuration: string
      termDurationInNumbers: string
      termType: string
      rateTransactionInNumbers: string
      rateTransactionInWords: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function AgreementStep({ formData, updateFormData, onEnterPress }: AgreementStepProps) {
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
          Agreement Details
        </CardTitle>
        <CardDescription>Enter the details of the licensing agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="date"
          placeholder="Execution Date"
          value={formData.agreement.executionDate}
          onChange={(e) => updateFormData("agreement.executionDate", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Governing State"
          value={formData.agreement.governingState}
          onChange={(e) => updateFormData("agreement.governingState", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Term Duration"
          value={formData.agreement.termDuration}
          onChange={(e) => updateFormData("agreement.termDuration", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Term Duration in Numbers"
          value={formData.agreement.termDurationInNumbers}
          onChange={(e) => updateFormData("agreement.termDurationInNumbers", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Term Type"
          value={formData.agreement.termType}
          onChange={(e) => updateFormData("agreement.termType", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="number"
          placeholder="Rate Transaction in Numbers"
          value={formData.agreement.rateTransactionInNumbers}
          onChange={(e) => updateFormData("agreement.rateTransactionInNumbers", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Rate Transaction in Words"
          value={formData.agreement.rateTransactionInWords}
          onChange={(e) => updateFormData("agreement.rateTransactionInWords", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

