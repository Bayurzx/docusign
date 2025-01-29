import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ConsultantStepProps {
  formData: {
    consultant: {
      email: string
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
      geographical_area: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ConsultantStep({ formData, updateFormData, onEnterPress }: ConsultantStepProps) {
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
          Consultant Information
        </CardTitle>
        <CardDescription>Enter the details for the consultant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Company Name"
          value={formData.consultant.company_name}
          onChange={(e) => updateFormData("consultant.company_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.consultant.full_name.first_name}
          onChange={(e) => updateFormData("consultant.full_name.first_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.consultant.full_name.last_name}
          onChange={(e) => updateFormData("consultant.full_name.last_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.consultant.email}
          onChange={(e) => updateFormData("consultant.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.consultant.address.street}
          onChange={(e) => updateFormData("consultant.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.consultant.address.city}
          onChange={(e) => updateFormData("consultant.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.consultant.address.state}
          onChange={(e) => updateFormData("consultant.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="ZIP"
          value={formData.consultant.address.zip}
          onChange={(e) => updateFormData("consultant.address.zip", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.consultant.state}
          onChange={(e) => updateFormData("consultant.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.consultant.country}
          onChange={(e) => updateFormData("consultant.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Geographical Area"
          value={formData.consultant.geographical_area}
          onChange={(e) => updateFormData("consultant.geographical_area", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

