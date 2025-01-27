import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReleaseeStepProps {
  formData: {
    releasee: {
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

export function ReleaseeStep({ formData, updateFormData, onEnterPress }: ReleaseeStepProps) {
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
          Releasee Information
        </CardTitle>
        <CardDescription>Enter the details for the releasee</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="releaseeFirstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            id="releaseeFirstName"
            type="text"
            placeholder="e.g., Jane"
            value={formData.releasee.firstName}
            onChange={(e) => updateFormData("releasee.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeLastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            id="releaseeLastName"
            type="text"
            placeholder="e.g., Smith"
            value={formData.releasee.lastName}
            onChange={(e) => updateFormData("releasee.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeStreetAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="releaseeStreetAddress"
            type="text"
            placeholder="e.g., 5678 Pine Avenue"
            value={formData.releasee.streetAddress}
            onChange={(e) => updateFormData("releasee.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeCity" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="releaseeCity"
            type="text"
            placeholder="e.g., Lakeside"
            value={formData.releasee.city}
            onChange={(e) => updateFormData("releasee.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeState" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            id="releaseeState"
            type="text"
            placeholder="e.g., Michigan"
            value={formData.releasee.state}
            onChange={(e) => updateFormData("releasee.state", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseePostalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="releaseePostalCode"
            type="text"
            placeholder="e.g., 48324"
            value={formData.releasee.postalCode}
            onChange={(e) => updateFormData("releasee.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="releaseeCountry"
            type="text"
            placeholder="e.g., USA"
            value={formData.releasee.country}
            onChange={(e) => updateFormData("releasee.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeSignature" className="block text-sm font-medium text-gray-700 mb-1">
            Signature
          </label>
          <Input
            id="releaseeSignature"
            type="text"
            placeholder="Type your full name as signature"
            value={formData.releasee.signature}
            onChange={(e) => updateFormData("releasee.signature", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="releaseeSignatureDate" className="block text-sm font-medium text-gray-700 mb-1">
            Signature Date
          </label>
          <Input
            id="releaseeSignatureDate"
            type="date"
            value={formData.releasee.signatureDate}
            onChange={(e) => updateFormData("releasee.signatureDate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

