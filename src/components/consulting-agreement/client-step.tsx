import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientStepProps {
  formData: {
    client: {
      company_name: string
      full_name: {
        first_name: string
        last_name: string
      }
      address: {
        street: string
        city: string
        state: string
        zip: string
      }
      state: string
      country: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ClientStep({ formData, updateFormData, onEnterPress }: ClientStepProps) {
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
          Client Information
        </CardTitle>
        <CardDescription>Enter the details for the client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Company Name"
          value={formData.client.company_name}
          onChange={(e) => updateFormData("client.company_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.client.full_name.first_name}
          onChange={(e) => updateFormData("client.full_name.first_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.client.full_name.last_name}
          onChange={(e) => updateFormData("client.full_name.last_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.client.address.street}
          onChange={(e) => updateFormData("client.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.client.address.city}
          onChange={(e) => updateFormData("client.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.client.address.state}
          onChange={(e) => updateFormData("client.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="ZIP"
          value={formData.client.address.zip}
          onChange={(e) => updateFormData("client.address.zip", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.client.state}
          onChange={(e) => updateFormData("client.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.client.country}
          onChange={(e) => updateFormData("client.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

