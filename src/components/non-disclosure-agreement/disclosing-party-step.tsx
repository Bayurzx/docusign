import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DisclosingPartyStepProps {
  formData: {
    disclosingPartyName: string
    disclosingPartyStreet: string
    disclosingPartyCity: string
    disclosingPartyState: string
    disclosingPartyPostal: string
    disclosingPartyCountry: string
    disclosingPartySignature: string
    disclosingPartyDate: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function DisclosingPartyStep({ formData, updateFormData, onEnterPress }: DisclosingPartyStepProps) {
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
          Disclosing Party Information
        </CardTitle>
        <CardDescription>Enter the details for the disclosing party</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="disclosingPartyName" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="disclosingPartyName"
            type="text"
            placeholder="Full Name"
            value={formData.disclosingPartyName}
            onChange={(e) => updateFormData("disclosingPartyName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyStreet" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="disclosingPartyStreet"
            type="text"
            placeholder="Street Address"
            value={formData.disclosingPartyStreet}
            onChange={(e) => updateFormData("disclosingPartyStreet", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyCity" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="disclosingPartyCity"
            type="text"
            placeholder="City"
            value={formData.disclosingPartyCity}
            onChange={(e) => updateFormData("disclosingPartyCity", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyState" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            id="disclosingPartyState"
            type="text"
            placeholder="State"
            value={formData.disclosingPartyState}
            onChange={(e) => updateFormData("disclosingPartyState", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyPostal" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="disclosingPartyPostal"
            type="text"
            placeholder="Postal Code"
            value={formData.disclosingPartyPostal}
            onChange={(e) => updateFormData("disclosingPartyPostal", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="disclosingPartyCountry"
            type="text"
            placeholder="Country"
            value={formData.disclosingPartyCountry}
            onChange={(e) => updateFormData("disclosingPartyCountry", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartySignature" className="block text-sm font-medium text-gray-700 mb-1">
            Signature
          </label>
          <Input
            id="disclosingPartySignature"
            type="text"
            placeholder="Type your full name as signature"
            value={formData.disclosingPartySignature}
            onChange={(e) => updateFormData("disclosingPartySignature", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="disclosingPartyDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            id="disclosingPartyDate"
            type="date"
            value={formData.disclosingPartyDate}
            onChange={(e) => updateFormData("disclosingPartyDate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

