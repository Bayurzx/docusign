import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TransferorStepProps {
  formData: {
    transferor: {
      address: {
        street: string
        street_line_2: string
        city: string
        state: string
        postal: string
        country: string
      }
      phone: string
      email: string
      signature: {
        name: string
        date: string
      }
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function TransferorStep({ formData, updateFormData, onEnterPress }: TransferorStepProps) {
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
          Transferor Information
        </CardTitle>
        <CardDescription>Enter the details for the transferor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Street"
          value={formData.transferor.address.street}
          onChange={(e) => updateFormData("transferor.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Line 2"
          value={formData.transferor.address.street_line_2}
          onChange={(e) => updateFormData("transferor.address.street_line_2", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.transferor.address.city}
          onChange={(e) => updateFormData("transferor.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.transferor.address.state}
          onChange={(e) => updateFormData("transferor.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.transferor.address.postal}
          onChange={(e) => updateFormData("transferor.address.postal", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.transferor.address.country}
          onChange={(e) => updateFormData("transferor.address.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={formData.transferor.phone}
          onChange={(e) => updateFormData("transferor.phone", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.transferor.email}
          onChange={(e) => updateFormData("transferor.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Signature Name"
          value={formData.transferor.signature.name}
          onChange={(e) => updateFormData("transferor.signature.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Signature Date"
          value={formData.transferor.signature.date}
          onChange={(e) => updateFormData("transferor.signature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

