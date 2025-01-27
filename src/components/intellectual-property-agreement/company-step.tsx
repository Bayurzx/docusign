import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanyStepProps {
  formData: {
    company: {
      name: string
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
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function CompanyStep({ formData, updateFormData, onEnterPress }: CompanyStepProps) {
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
          Company Information
        </CardTitle>
        <CardDescription>Enter the details for the company</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Company Name"
          value={formData.company.name}
          onChange={(e) => updateFormData("company.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address"
          value={formData.company.streetAddress}
          onChange={(e) => updateFormData("company.streetAddress", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address Line 2"
          value={formData.company.streetAddressLine2}
          onChange={(e) => updateFormData("company.streetAddressLine2", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.company.city}
          onChange={(e) => updateFormData("company.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.company.state}
          onChange={(e) => updateFormData("company.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.company.postalCode}
          onChange={(e) => updateFormData("company.postalCode", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.company.country}
          onChange={(e) => updateFormData("company.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.company.phoneNumber}
          onChange={(e) => updateFormData("company.phoneNumber", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.company.email}
          onChange={(e) => updateFormData("company.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Revenue Share (%)"
          value={formData.company.revenueShare}
          onChange={(e) => updateFormData("company.revenueShare", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Signature"
          value={formData.company.signature}
          onChange={(e) => updateFormData("company.signature", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          value={formData.company.date}
          onChange={(e) => updateFormData("company.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

