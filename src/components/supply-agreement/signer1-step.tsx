import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Signer1StepProps {
  formData: {
    signer1Email: string
    signer1Name: string
    signer1ClientId: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function Signer1Step({ formData, updateFormData, onEnterPress }: Signer1StepProps) {
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
          Signer 1 Information
        </CardTitle>
        <CardDescription>Enter the details for the first signer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={formData.signer1Email}
          onChange={(e) => updateFormData("signer1Email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Name"
          value={formData.signer1Name}
          onChange={(e) => updateFormData("signer1Name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Client ID"
          value={formData.signer1ClientId}
          onChange={(e) => updateFormData("signer1ClientId", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}

