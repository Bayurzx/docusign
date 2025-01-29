import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LicensorStepProps {
  formData: {
    licensor: {
      companyName: string
      streetAddress: string
      city: string
      state: string
      postalCode: string
      signature: {
        email: string
        firstName: string
        lastName: string
        position: string
        date: string
      }
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function LicensorStep({ formData, updateFormData, onEnterPress }: LicensorStepProps) {
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
          Licensor Information
        </CardTitle>
        <CardDescription>Enter the details for the licensor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Company Name"
          value={formData.licensor.companyName}
          onChange={(e) => updateFormData("licensor.companyName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address"
          value={formData.licensor.streetAddress}
          onChange={(e) => updateFormData("licensor.streetAddress", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.licensor.city}
          onChange={(e) => updateFormData("licensor.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.licensor.state}
          onChange={(e) => updateFormData("licensor.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.licensor.postalCode}
          onChange={(e) => updateFormData("licensor.postalCode", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.licensor.signature.firstName}
          onChange={(e) => updateFormData("licensor.signature.firstName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.licensor.signature.lastName}
          onChange={(e) => updateFormData("licensor.signature.lastName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.licensor.signature.email}
          onChange={(e) => updateFormData("licensor.signature.email", e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
        <Input
          type="text"
          placeholder="Position"
          value={formData.licensor.signature.position}
          onChange={(e) => updateFormData("licensor.signature.position", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.licensor.signature.date}
          onChange={(e) => updateFormData("licensor.signature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

