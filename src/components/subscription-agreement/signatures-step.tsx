import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SignaturesStepProps {
  formData: {
    signatures: {
      company: {
        name: string
        date: string
        signature: string
      }
      investor: {
        name: string
        date: string
        signature: string
      }
    }
  }
  updateFormData: (key: string, value: string) => void
  onEnterPress: () => void
}

export function SignaturesStep({ formData, updateFormData, onEnterPress }: SignaturesStepProps) {
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
          Signatures
        </CardTitle>
        <CardDescription>Enter the signature details for the company and investor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Company Signature</h3>
          <div>
            <label htmlFor="companySignatureName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="companySignatureName"
              type="text"
              placeholder="e.g., John Smith"
              value={formData.signatures.company.name}
              onChange={(e) => updateFormData("signatures.company.name", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label htmlFor="companySignatureDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              id="companySignatureDate"
              type="date"
              value={formData.signatures.company.date}
              onChange={(e) => updateFormData("signatures.company.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the date when the company representative signs the agreement.
            </p>
          </div>
          <div>
            <label htmlFor="companySignature" className="block text-sm font-medium text-gray-700 mb-1">
              Signature
            </label>
            <Input
              id="companySignature"
              type="text"
              placeholder="Type your full name as signature"
              value={formData.signatures.company.signature}
              onChange={(e) => updateFormData("signatures.company.signature", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Investor Signature</h3>
          <div>
            <label htmlFor="investorSignatureName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="investorSignatureName"
              type="text"
              placeholder="e.g., Jane Doe"
              value={formData.signatures.investor.name}
              onChange={(e) => updateFormData("signatures.investor.name", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label htmlFor="investorSignatureDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              id="investorSignatureDate"
              type="date"
              value={formData.signatures.investor.date}
              onChange={(e) => updateFormData("signatures.investor.date", e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <p className="text-sm text-gray-500 mt-1">Enter the date when the investor signs the agreement.</p>
          </div>
          <div>
            <label htmlFor="investorSignature" className="block text-sm font-medium text-gray-700 mb-1">
              Signature
            </label>
            <Input
              id="investorSignature"
              type="text"
              placeholder="Type your full name as signature"
              value={formData.signatures.investor.signature}
              onChange={(e) => updateFormData("signatures.investor.signature", e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

