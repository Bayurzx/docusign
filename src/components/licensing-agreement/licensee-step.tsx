import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LicenseeStepProps {
  formData: {
    licensee: {
      companyName: string
      typeOfCompany: string
      streetAddress: string
      city: string
      state: string
      postalCode: string
      country: string
      signature: {
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

export function LicenseeStep({ formData, updateFormData, onEnterPress }: LicenseeStepProps) {
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
          Licensee Information
        </CardTitle>
        <CardDescription>Enter the details for the licensee</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Company Name"
          value={formData.licensee.companyName}
          onChange={(e) => updateFormData("licensee.companyName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Type of Company"
          value={formData.licensee.typeOfCompany}
          onChange={(e) => updateFormData("licensee.typeOfCompany", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street Address"
          value={formData.licensee.streetAddress}
          onChange={(e) => updateFormData("licensee.streetAddress", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.licensee.city}
          onChange={(e) => updateFormData("licensee.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.licensee.state}
          onChange={(e) => updateFormData("licensee.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.licensee.postalCode}
          onChange={(e) => updateFormData("licensee.postalCode", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.licensee.country}
          onChange={(e) => updateFormData("licensee.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.licensee.signature.firstName}
          onChange={(e) => updateFormData("licensee.signature.firstName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.licensee.signature.lastName}
          onChange={(e) => updateFormData("licensee.signature.lastName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Position"
          value={formData.licensee.signature.position}
          onChange={(e) => updateFormData("licensee.signature.position", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.licensee.signature.date}
          onChange={(e) => updateFormData("licensee.signature.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

