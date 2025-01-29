import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SupplierSignatureStepProps {
  formData: {
    supplierSignature: {
      signature: string
      firstName: string
      lastName: string
      date: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function SupplierSignatureStep({ formData, updateFormData, onEnterPress }: SupplierSignatureStepProps) {
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
          Supplier Signature
        </CardTitle>
        <CardDescription>Enter the supplier&apos;s signature details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Signature"
          value={formData.supplierSignature.signature}
          onChange={(e) => updateFormData("supplierSignature.signature", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.supplierSignature.firstName}
          onChange={(e) => updateFormData("supplierSignature.firstName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.supplierSignature.lastName}
          onChange={(e) => updateFormData("supplierSignature.lastName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.supplierSignature.date}
          onChange={(e) => updateFormData("supplierSignature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

