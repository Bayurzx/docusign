import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReleasorStepProps {
  formData: {
    releasor: {
      firstName: string
      lastName: string
      streetAddress: string
      city: string
      state: string
      postalCode: string
      country: string
      signature: string
      signatureDate: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ReleasorStep({ formData, updateFormData, onEnterPress }: ReleasorStepProps) {
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
          Releasor Information
        </CardTitle>
        <CardDescription>Enter the details for the releasor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="releasorFirstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            id="releasorFirstName"
            type="text"
            placeholder="e.g., John"
            value={formData.releasor.firstName}
            onChange={(e) => updateFormData("releasor.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorLastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            id="releasorLastName"
            type="text"
            placeholder="e.g., Doe"
            value={formData.releasor.lastName}
            onChange={(e) => updateFormData("releasor.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorStreetAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="releasorStreetAddress"
            type="text"
            placeholder="e.g., 1234 Maple Street"
            value={formData.releasor.streetAddress}
            onChange={(e) => updateFormData("releasor.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorCity" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="releasorCity"
            type="text"
            placeholder="e.g., Greenwood"
            value={formData.releasor.city}
            onChange={(e) => updateFormData("releasor.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorState" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            id="releasorState"
            type="text"
            placeholder="e.g., Indiana"
            value={formData.releasor.state}
            onChange={(e) => updateFormData("releasor.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="releasorPostalCode"
            type="text"
            placeholder="e.g., 46142"
            value={formData.releasor.postalCode}
            onChange={(e) => updateFormData("releasor.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="releasorCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.releasor.country}
            onChange={(e) => updateFormData("releasor.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorSignature" className="block text-sm font-medium text-gray-700 mb-1">
            Signature
          </label>
          <Input
            id="releasorSignature"
            type="text"
            placeholder="Type your full name as signature"
            value={formData.releasor.signature}
            onChange={(e) => updateFormData("releasor.signature", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releasorSignatureDate" className="block text-sm font-medium text-gray-700 mb-1">
            Signature Date
          </label>
          <Input
            id="releasorSignatureDate"
            type="date"
            value={formData.releasor.signatureDate}
            onChange={(e) => updateFormData("releasor.signatureDate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

