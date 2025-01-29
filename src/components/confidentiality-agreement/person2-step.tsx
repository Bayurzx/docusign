import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Person2StepProps {
  formData: {
    person_2: {
      full_name: {
        first_name: string
        last_name: string
      }
      address: {
        street: string
        city: string
        state: string
        zip: string
      }
      state: string
      country: string
      email: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function Person2Step({ formData, updateFormData, onEnterPress }: Person2StepProps) {
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
          Person 2 Information
        </CardTitle>
        <CardDescription>Enter the details for the second person</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          value={formData.person_2.full_name.first_name}
          onChange={(e) => updateFormData("person_2.full_name.first_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.person_2.full_name.last_name}
          onChange={(e) => updateFormData("person_2.full_name.last_name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.person_2.address.street}
          onChange={(e) => updateFormData("person_2.address.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.person_2.address.city}
          onChange={(e) => updateFormData("person_2.address.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.person_2.address.state}
          onChange={(e) => updateFormData("person_2.address.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="ZIP"
          value={formData.person_2.address.zip}
          onChange={(e) => updateFormData("person_2.address.zip", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.person_2.state}
          onChange={(e) => updateFormData("person_2.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.person_2.country}
          onChange={(e) => updateFormData("person_2.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.person_2.email}
          onChange={(e) => updateFormData("person_2.email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

