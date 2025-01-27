import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TransfereeStepProps {
  formData: {
    transferee: {
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

export function TransfereeStep({ formData, updateFormData, onEnterPress }: TransfereeStepProps) {
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
          Transferee Information
        </CardTitle>
        <CardDescription>Enter the details for the transferee</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Street"
          value={formData.transferee.address.street}
          onChange={(e) => updateFormData("transferee.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Line 2"
          value={formData.transferee.address.street_line_2}
          onChange={(e) => updateFormData("transferee.address.street_line_2", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.transferee.address.city}
          onChange={(e) => updateFormData("transferee.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.transferee.address.state}
          onChange={(e) => updateFormData("transferee.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.transferee.address.postal}
          onChange={(e) => updateFormData("transferee.address.postal", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.transferee.address.country}
          onChange={(e) => updateFormData("transferee.address.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={formData.transferee.phone}
          onChange={(e) => updateFormData("transferee.phone", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.transferee.email}
          onChange={(e) => updateFormData("transferee.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Signature Name"
          value={formData.transferee.signature.name}
          onChange={(e) => updateFormData("transferee.signature.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Signature Date"
          value={formData.transferee.signature.date}
          onChange={(e) => updateFormData("transferee.signature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

