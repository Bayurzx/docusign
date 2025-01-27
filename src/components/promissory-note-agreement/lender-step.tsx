import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LenderStepProps {
  formData: {
    lender: {
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
      date: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function LenderStep({ formData, updateFormData, onEnterPress }: LenderStepProps) {
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
          Lender Information
        </CardTitle>
        <CardDescription>Enter the details for the lender</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="lenderFirstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            id="lenderFirstName"
            type="text"
            placeholder="e.g., Jane"
            value={formData.lender.firstName}
            onChange={(e) => updateFormData("lender.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderLastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            id="lenderLastName"
            type="text"
            placeholder="e.g., Smith"
            value={formData.lender.lastName}
            onChange={(e) => updateFormData("lender.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderStreetAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="lenderStreetAddress"
            type="text"
            placeholder="e.g., 456 Oak St"
            value={formData.lender.streetAddress}
            onChange={(e) => updateFormData("lender.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderStreetAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address Line 2
          </label>
          <Input
            id="lenderStreetAddressLine2"
            type="text"
            placeholder="e.g., Suite 789"
            value={formData.lender.streetAddressLine2}
            onChange={(e) => updateFormData("lender.streetAddressLine2", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderCity" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="lenderCity"
            type="text"
            placeholder="e.g., Los Angeles"
            value={formData.lender.city}
            onChange={(e) => updateFormData("lender.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderState" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            id="lenderState"
            type="text"
            placeholder="e.g., CA"
            value={formData.lender.state}
            onChange={(e) => updateFormData("lender.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="lenderPostalCode"
            type="text"
            placeholder="e.g., 90001"
            value={formData.lender.postalCode}
            onChange={(e) => updateFormData("lender.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="lenderCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.lender.country}
            onChange={(e) => updateFormData("lender.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            id="lenderPhoneNumber"
            type="tel"
            placeholder="e.g., +1 (555) 987-6543"
            value={formData.lender.phoneNumber}
            onChange={(e) => updateFormData("lender.phoneNumber", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="lenderEmail"
            type="email"
            placeholder="e.g., jane.smith@example.com"
            value={formData.lender.email}
            onChange={(e) => updateFormData("lender.email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="lenderDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            id="lenderDate"
            type="date"
            value={formData.lender.date}
            onChange={(e) => updateFormData("lender.date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

