import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RenterStepProps {
  formData: {
    renter: {
      firstName: string
      lastName: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function RenterStep({ formData, updateFormData, onEnterPress }: RenterStepProps) {
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
          Renter Information
        </CardTitle>
        <CardDescription>Enter the details of the renter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="renterFirstName" className="block text-sm font-medium text-gray-500 mb-1">
            First Name
          </label>
          <Input
            id="renterFirstName"
            type="text"
            placeholder="e.g., Jane"
            value={formData.renter.firstName}
            onChange={(e) => updateFormData("renter.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="renterLastName" className="block text-sm font-medium text-gray-500 mb-1">
            Last Name
          </label>
          <Input
            id="renterLastName"
            type="text"
            placeholder="e.g., Smith"
            value={formData.renter.lastName}
            onChange={(e) => updateFormData("renter.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

