import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReceivingPartyStepProps {
  formData: {
    receivingPartyName: string
    receivingPartyEmail: string
    receivingPartyStreet: string
    receivingPartyCity: string
    receivingPartyState: string
    receivingPartyPostal: string
    receivingPartyCountry: string
    receivingPartySignature: string
    receivingPartyDate: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function ReceivingPartyStep({ formData, updateFormData, onEnterPress }: ReceivingPartyStepProps) {
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
          Receiving Party Information
        </CardTitle>
        <CardDescription>Enter the details for the receiving party</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="receivingPartyName" className="block text-sm font-medium text-gray-500 mb-1">
            Name
          </label>
          <Input
            id="receivingPartyName"
            type="text"
            placeholder="Full Name"
            value={formData.receivingPartyName}
            onChange={(e) => updateFormData("receivingPartyName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyEmail" className="block text-sm font-medium text-gray-500 mb-1">
            Name
          </label>
          <Input
            id="receivingPartyEmail"
            type="email"
            placeholder="Email"
            value={formData.receivingPartyEmail}
            onChange={(e) => updateFormData("receivingPartyEmail", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyStreet" className="block text-sm font-medium text-gray-500 mb-1">
            Street Address
          </label>
          <Input
            id="receivingPartyStreet"
            type="text"
            placeholder="Street Address"
            value={formData.receivingPartyStreet}
            onChange={(e) => updateFormData("receivingPartyStreet", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyCity" className="block text-sm font-medium text-gray-500 mb-1">
            City
          </label>
          <Input
            id="receivingPartyCity"
            type="text"
            placeholder="City"
            value={formData.receivingPartyCity}
            onChange={(e) => updateFormData("receivingPartyCity", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyState" className="block text-sm font-medium text-gray-500 mb-1">
            State
          </label>
          <Input
            id="receivingPartyState"
            type="text"
            placeholder="State"
            value={formData.receivingPartyState}
            onChange={(e) => updateFormData("receivingPartyState", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyPostal" className="block text-sm font-medium text-gray-500 mb-1">
            Postal Code
          </label>
          <Input
            id="receivingPartyPostal"
            type="text"
            placeholder="Postal Code"
            value={formData.receivingPartyPostal}
            onChange={(e) => updateFormData("receivingPartyPostal", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyCountry" className="block text-sm font-medium text-gray-500 mb-1">
            Country
          </label>
          <Input
            id="receivingPartyCountry"
            type="text"
            placeholder="Country"
            value={formData.receivingPartyCountry}
            onChange={(e) => updateFormData("receivingPartyCountry", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartySignature" className="block text-sm font-medium text-gray-500 mb-1">
            Signature
          </label>
          <Input
            id="receivingPartySignature"
            type="text"
            placeholder="Type your full name as signature"
            value={formData.receivingPartySignature}
            onChange={(e) => updateFormData("receivingPartySignature", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="receivingPartyDate" className="block text-sm font-medium text-gray-500 mb-1">
            Date
          </label>
          <Input
            id="receivingPartyDate"
            type="date"
            value={formData.receivingPartyDate}
            onChange={(e) => updateFormData("receivingPartyDate", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

