import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UtilitiesStepProps {
  formData: {
    utilities: {
      gasElectricity: number
      water: number
      garbage: number
      internet: number
      cableTV: number
      otherLiability: number
    }
  }
  updateFormData: (key: string, value: number) => void
  onEnterPress: () => void
}

export function UtilitiesStep({ formData, updateFormData, onEnterPress }: UtilitiesStepProps) {
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
          Utilities
        </CardTitle>
        <CardDescription>Enter the monthly costs for utilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="gasElectricity" className="block text-sm font-medium text-gray-500 mb-1">
            Gas & Electricity
          </label>
          <Input
            id="gasElectricity"
            type="number"
            placeholder="e.g., 70"
            value={formData.utilities.gasElectricity}
            onChange={(e) => updateFormData("utilities.gasElectricity", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="water" className="block text-sm font-medium text-gray-500 mb-1">
            Water
          </label>
          <Input
            id="water"
            type="number"
            placeholder="e.g., 100"
            value={formData.utilities.water}
            onChange={(e) => updateFormData("utilities.water", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="garbage" className="block text-sm font-medium text-gray-500 mb-1">
            Garbage
          </label>
          <Input
            id="garbage"
            type="number"
            placeholder="e.g., 100"
            value={formData.utilities.garbage}
            onChange={(e) => updateFormData("utilities.garbage", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="internet" className="block text-sm font-medium text-gray-500 mb-1">
            Internet
          </label>
          <Input
            id="internet"
            type="number"
            placeholder="e.g., 100"
            value={formData.utilities.internet}
            onChange={(e) => updateFormData("utilities.internet", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="cableTV" className="block text-sm font-medium text-gray-500 mb-1">
            Cable TV
          </label>
          <Input
            id="cableTV"
            type="number"
            placeholder="e.g., 100"
            value={formData.utilities.cableTV}
            onChange={(e) => updateFormData("utilities.cableTV", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="otherLiability" className="block text-sm font-medium text-gray-500 mb-1">
            Other Liability
          </label>
          <Input
            id="otherLiability"
            type="number"
            placeholder="e.g., 0"
            value={formData.utilities.otherLiability}
            onChange={(e) => updateFormData("utilities.otherLiability", Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

