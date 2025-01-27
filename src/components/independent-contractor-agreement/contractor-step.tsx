import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractorStepProps {
  formData: {
    contractor: {
      name: string
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
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ContractorStep({ formData, updateFormData, onEnterPress }: ContractorStepProps) {
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
          Contractor Information
        </CardTitle>
        <CardDescription>Enter the details for the contractor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Name"
          value={formData.contractor.name}
          onChange={(e) => updateFormData("contractor.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.contractor.address.street}
          onChange={(e) => updateFormData("contractor.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Line 2"
          value={formData.contractor.address.street_line_2}
          onChange={(e) => updateFormData("contractor.address.street_line_2", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.contractor.address.city}
          onChange={(e) => updateFormData("contractor.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.contractor.address.state}
          onChange={(e) => updateFormData("contractor.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.contractor.address.postal}
          onChange={(e) => updateFormData("contractor.address.postal", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.contractor.address.country}
          onChange={(e) => updateFormData("contractor.address.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={formData.contractor.phone}
          onChange={(e) => updateFormData("contractor.phone", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.contractor.email}
          onChange={(e) => updateFormData("contractor.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

