import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InvestorStepProps {
  formData: {
    investor: {
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

export function InvestorStep({ formData, updateFormData, onEnterPress }: InvestorStepProps) {
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
          Investor Information
        </CardTitle>
        <CardDescription>Enter the details for the investor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="investorName" className="block text-sm font-medium text-gray-700 mb-1">
            Investor Name
          </label>
          <Input
            id="investorName"
            type="text"
            placeholder="e.g., Jane Doe"
            value={formData.investor.name}
            onChange={(e) => updateFormData("investor.name", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorStreetAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="investorStreetAddress"
            type="text"
            placeholder="e.g., 456 Oak Rd"
            value={formData.investor.streetAddress}
            onChange={(e) => updateFormData("investor.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorStreetAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address Line 2
          </label>
          <Input
            id="investorStreetAddressLine2"
            type="text"
            placeholder="e.g., Apt 789"
            value={formData.investor.streetAddressLine2}
            onChange={(e) => updateFormData("investor.streetAddressLine2", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorCity" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="investorCity"
            type="text"
            placeholder="e.g., Elsewhere"
            value={formData.investor.city}
            onChange={(e) => updateFormData("investor.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorState" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            id="investorState"
            type="text"
            placeholder="e.g., NY"
            value={formData.investor.state}
            onChange={(e) => updateFormData("investor.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="investorPostalCode"
            type="text"
            placeholder="e.g., 67890"
            value={formData.investor.postalCode}
            onChange={(e) => updateFormData("investor.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="investorCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.investor.country}
            onChange={(e) => updateFormData("investor.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="investorEmail"
            type="email"
            placeholder="e.g., jane.doe@email.com"
            value={formData.investor.email}
            onChange={(e) => updateFormData("investor.email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="investorPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            id="investorPhoneNumber"
            type="tel"
            placeholder="e.g., 555-5678"
            value={formData.investor.phoneNumber}
            onChange={(e) => updateFormData("investor.phoneNumber", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

