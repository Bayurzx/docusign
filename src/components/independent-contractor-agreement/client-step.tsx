import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientStepProps {
  formData: {
    client: {
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
          placeholder="Name"
          value={formData.client.name}
          onChange={(e) => updateFormData("client.name", e.target.value)}
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
          placeholder="Street Line 2"
          value={formData.client.address.street_line_2}
          onChange={(e) => updateFormData("client.address.street_line_2", e.target.value)}
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
          placeholder="Postal Code"
          value={formData.client.address.postal}
          onChange={(e) => updateFormData("client.address.postal", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.client.address.country}
          onChange={(e) => updateFormData("client.address.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={formData.client.phone}
          onChange={(e) => updateFormData("client.phone", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.client.email}
          onChange={(e) => updateFormData("client.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

