import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HouseownerStepProps {
  formData: {
    houseowner: {
      firstName: string
      lastName: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function HouseownerStep({ formData, updateFormData, onEnterPress }: HouseownerStepProps) {
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
          Houseowner Information
        </CardTitle>
        <CardDescription>Enter the details of the houseowner</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="houseownerFirstName" className="block text-sm font-medium text-gray-500 mb-1">
            First Name
          </label>
          <Input
            id="houseownerFirstName"
            type="text"
            placeholder="e.g., John"
            value={formData.houseowner.firstName}
            onChange={(e) => updateFormData("houseowner.firstName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="houseownerLastName" className="block text-sm font-medium text-gray-500 mb-1">
            Last Name
          </label>
          <Input
            id="houseownerLastName"
            type="text"
            placeholder="e.g., Doe"
            value={formData.houseowner.lastName}
            onChange={(e) => updateFormData("houseowner.lastName", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

