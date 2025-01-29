import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BorrowerStepProps {
  formData: {
    borrower: {
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

export function BorrowerStep({ formData, updateFormData, onEnterPress }: BorrowerStepProps) {
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
          Borrower Information
        </CardTitle>
        <CardDescription>Enter the details for the borrower</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="borrowerFirstName" className="block text-sm font-medium text-gray-500 mb-1">
            First Name
          </label>
          <Input
            id="borrowerFirstName"
            type="text"
            placeholder="e.g., John"
            value={formData.borrower.firstName}
            onChange={(e) => updateFormData("borrower.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerLastName" className="block text-sm font-medium text-gray-500 mb-1">
            Last Name
          </label>
          <Input
            id="borrowerLastName"
            type="text"
            placeholder="e.g., Doe"
            value={formData.borrower.lastName}
            onChange={(e) => updateFormData("borrower.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerStreetAddress" className="block text-sm font-medium text-gray-500 mb-1">
            Street Address
          </label>
          <Input
            id="borrowerStreetAddress"
            type="text"
            placeholder="e.g., 123 Main St"
            value={formData.borrower.streetAddress}
            onChange={(e) => updateFormData("borrower.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerStreetAddressLine2" className="block text-sm font-medium text-gray-500 mb-1">
            Street Address Line 2
          </label>
          <Input
            id="borrowerStreetAddressLine2"
            type="text"
            placeholder="e.g., Apt 4B"
            value={formData.borrower.streetAddressLine2}
            onChange={(e) => updateFormData("borrower.streetAddressLine2", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerCity" className="block text-sm font-medium text-gray-500 mb-1">
            City
          </label>
          <Input
            id="borrowerCity"
            type="text"
            placeholder="e.g., New York"
            value={formData.borrower.city}
            onChange={(e) => updateFormData("borrower.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerState" className="block text-sm font-medium text-gray-500 mb-1">
            State
          </label>
          <Input
            id="borrowerState"
            type="text"
            placeholder="e.g., NY"
            value={formData.borrower.state}
            onChange={(e) => updateFormData("borrower.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerPostalCode" className="block text-sm font-medium text-gray-500 mb-1">
            Postal Code
          </label>
          <Input
            id="borrowerPostalCode"
            type="text"
            placeholder="e.g., 10001"
            value={formData.borrower.postalCode}
            onChange={(e) => updateFormData("borrower.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerCountry" className="block text-sm font-medium text-gray-500 mb-1">
            Country
          </label>
          <Input
            id="borrowerCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.borrower.country}
            onChange={(e) => updateFormData("borrower.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerPhoneNumber" className="block text-sm font-medium text-gray-500 mb-1">
            Phone Number
          </label>
          <Input
            id="borrowerPhoneNumber"
            type="tel"
            placeholder="e.g., +1 (555) 123-4567"
            value={formData.borrower.phoneNumber}
            onChange={(e) => updateFormData("borrower.phoneNumber", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerEmail" className="block text-sm font-medium text-gray-500 mb-1">
            Email
          </label>
          <Input
            id="borrowerEmail"
            type="email"
            placeholder="e.g., john.doe@example.com"
            value={formData.borrower.email}
            onChange={(e) => updateFormData("borrower.email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="borrowerDate" className="block text-sm font-medium text-gray-500 mb-1">
            Date
          </label>
          <Input
            id="borrowerDate"
            type="date"
            value={formData.borrower.date}
            onChange={(e) => updateFormData("borrower.date", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

