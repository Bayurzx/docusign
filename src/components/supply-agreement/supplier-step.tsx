import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SupplierStepProps {
  formData: {
    supplier: {
      name: string
      street: string
      city: string
      state: string
      postalCode: string
      country: string
      date: string
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function SupplierStep({ formData, updateFormData, onEnterPress }: SupplierStepProps) {
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
          Supplier Information
        </CardTitle>
        <CardDescription>Enter the details for the supplier</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Supplier Name"
          value={formData.supplier.name}
          onChange={(e) => updateFormData("supplier.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.supplier.street}
          onChange={(e) => updateFormData("supplier.street", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.supplier.city}
          onChange={(e) => updateFormData("supplier.city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.supplier.state}
          onChange={(e) => updateFormData("supplier.state", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={formData.supplier.postalCode}
          onChange={(e) => updateFormData("supplier.postalCode", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.supplier.country}
          onChange={(e) => updateFormData("supplier.country", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.supplier.date}
          onChange={(e) => updateFormData("supplier.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

