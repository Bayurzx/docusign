import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanySignatureStepProps {
  formData: {
    companySignature: {
      signature: string
      firstName: string
      lastName: string
      date: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function CompanySignatureStep({ formData, updateFormData, onEnterPress }: CompanySignatureStepProps) {
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
          Company Signature
        </CardTitle>
        <CardDescription>Enter the company's signature details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Signature"
          value={formData.companySignature.signature}
          onChange={(e) => updateFormData("companySignature.signature", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.companySignature.firstName}
          onChange={(e) => updateFormData("companySignature.firstName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.companySignature.lastName}
          onChange={(e) => updateFormData("companySignature.lastName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.companySignature.date}
          onChange={(e) => updateFormData("companySignature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

