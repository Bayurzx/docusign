import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Signer2StepProps {
  formData: {
    signer2Email: string
    signer2Name: string
    // signer2ClientId: string
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function Signer2Step({ formData, updateFormData, onEnterPress }: Signer2StepProps) {
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
          Signer 2 Information
        </CardTitle>
        <CardDescription>Enter the details for the second signer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={formData.signer2Email}
          onChange={(e) => updateFormData("signer2Email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="Name"
          value={formData.signer2Name}
          onChange={(e) => updateFormData("signer2Name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* <Input
          type="text"
          placeholder="Client ID"
          value={formData.signer2ClientId}
          onChange={(e) => updateFormData("signer2ClientId", e.target.value)}
          onKeyDown={handleKeyDown}
        /> */}
      </CardContent>
    </Card>
  )
}

