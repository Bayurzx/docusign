import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OwnerStepProps {
  formData: {
    owner: {
      firstName: string
      lastName: string
      streetAddress: string
      streetAddressLine2: string
      city: string
      state: string
      postalCode: string
      country: string
      phoneNumber: string
      email: string
      revenueShare: string
      date: string
      signature: string
      position: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function OwnerStep({ formData, updateFormData, onEnterPress }: OwnerStepProps) {
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
          Owner Information
        </CardTitle>
        <CardDescription>Enter the details for the owner</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          value={formData.owner.firstName}
          onChange={(e) => updateFormData("owner.firstName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.owner.lastName}
          onChange={(e) => updateFormData("owner.lastName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address"
          value={formData.owner.streetAddress}
          onChange={(e) => updateFormData("owner.streetAddress", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address Line 2"
          value={formData.owner.streetAddressLine2}
          onChange={(e) => updateFormData("owner.streetAddressLine2", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.owner.city}
          onChange={(e) => updateFormData("owner.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.owner.state}
          onChange={(e) => updateFormData("owner.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.owner.postalCode}
          onChange={(e) => updateFormData("owner.postalCode", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.owner.country}
          onChange={(e) => updateFormData("owner.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.owner.phoneNumber}
          onChange={(e) => updateFormData("owner.phoneNumber", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.owner.email}
          onChange={(e) => updateFormData("owner.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Revenue Share (%)"
          value={formData.owner.revenueShare}
          onChange={(e) => updateFormData("owner.revenueShare", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Position"
          value={formData.owner.position}
          onChange={(e) => updateFormData("owner.position", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Signature"
          value={formData.owner.signature}
          onChange={(e) => updateFormData("owner.signature", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          value={formData.owner.date}
          onChange={(e) => updateFormData("owner.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

