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
      email: string
      phoneNumber: string
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
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-500 mb-1">
            Company Name
          </label>
          <Input
            id="companyName"
            type="text"
            placeholder="e.g., Acme Corp"
            value={formData.company.name}
            onChange={(e) => updateFormData("company.name", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyStreetAddress" className="block text-sm font-medium text-gray-500 mb-1">
            Street Address
          </label>
          <Input
            id="companyStreetAddress"
            type="text"
            placeholder="e.g., 123 Main St"
            value={formData.company.streetAddress}
            onChange={(e) => updateFormData("company.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyStreetAddressLine2" className="block text-sm font-medium text-gray-500 mb-1">
            Street Address Line 2
          </label>
          <Input
            id="companyStreetAddressLine2"
            type="text"
            placeholder="e.g., Suite 456"
            value={formData.company.streetAddressLine2}
            onChange={(e) => updateFormData("company.streetAddressLine2", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyCity" className="block text-sm font-medium text-gray-500 mb-1">
            City
          </label>
          <Input
            id="companyCity"
            type="text"
            placeholder="e.g., Anytown"
            value={formData.company.city}
            onChange={(e) => updateFormData("company.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyState" className="block text-sm font-medium text-gray-500 mb-1">
            State
          </label>
          <Input
            id="companyState"
            type="text"
            placeholder="e.g., CA"
            value={formData.company.state}
            onChange={(e) => updateFormData("company.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyPostalCode" className="block text-sm font-medium text-gray-500 mb-1">
            Postal Code
          </label>
          <Input
            id="companyPostalCode"
            type="text"
            placeholder="e.g., 12345"
            value={formData.company.postalCode}
            onChange={(e) => updateFormData("company.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyCountry" className="block text-sm font-medium text-gray-500 mb-1">
            Country
          </label>
          <Input
            id="companyCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.company.country}
            onChange={(e) => updateFormData("company.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-500 mb-1">
            Email
          </label>
          <Input
            id="companyEmail"
            type="email"
            placeholder="e.g., info@acmecorp.com"
            value={formData.company.email}
            onChange={(e) => updateFormData("company.email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="companyPhoneNumber" className="block text-sm font-medium text-gray-500 mb-1">
            Phone Number
          </label>
          <Input
            id="companyPhoneNumber"
            type="tel"
            placeholder="e.g., 555-1234"
            value={formData.company.phoneNumber}
            onChange={(e) => updateFormData("company.phoneNumber", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

