import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SignerInfoStepProps {
  formData: { email: string; name: string }
  updateFormData: (key: 'email' | 'name', value: string) => void
  onEnterPress: () => void
}

export function SignerInfoStep({ formData, updateFormData, onEnterPress }: SignerInfoStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-gradient-to-r from-blue-500 to-purple-500 min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Signer Information</CardTitle>
        <CardDescription>Enter the signer's email and name</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Signer Email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Signer Name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}

