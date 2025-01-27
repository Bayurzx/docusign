import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AddressStepProps {
  formData: {
    address: {
      streetAddress: string
      streetAddressLine2: string
      city: string
      stateProvince: string
      postalCode: string
      country: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function AddressStep({ formData, updateFormData, onEnterPress }: AddressStepProps) {
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
          Property Address
        </CardTitle>
        <CardDescription>Enter the address of the rental property</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <Input
            id="streetAddress"
            type="text"
            placeholder="e.g., 1234 Oak Street"
            value={formData.address.streetAddress}
            onChange={(e) => updateFormData("address.streetAddress", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="streetAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address Line 2
          </label>
          <Input
            id="streetAddressLine2"
            type="text"
            placeholder="e.g., Apt 101"
            value={formData.address.streetAddressLine2}
            onChange={(e) => updateFormData("address.streetAddressLine2", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            id="city"
            type="text"
            placeholder="e.g., Sunnyvale"
            value={formData.address.city}
            onChange={(e) => updateFormData("address.city", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="stateProvince" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <Input
            id="stateProvince"
            type="text"
            placeholder="e.g., California"
            value={formData.address.stateProvince}
            onChange={(e) => updateFormData("address.stateProvince", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            id="postalCode"
            type="text"
            placeholder="e.g., 94086"
            value={formData.address.postalCode}
            onChange={(e) => updateFormData("address.postalCode", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Input
            id="country"
            type="text"
            placeholder="e.g., USA"
            value={formData.address.country}
            onChange={(e) => updateFormData("address.country", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

