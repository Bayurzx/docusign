import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ContractStepProps {
  formData: {
    docFile: File | null
    contractName: string
  }
  updateFormData: (key: string, value: string | File) => void
  onEnterPress: () => void
}

export function ContractStep({ formData, updateFormData, onEnterPress }: ContractStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEnterPress()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData("docFile", e.target.files[0])
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Contract Information
        </CardTitle>
        <CardDescription>Upload the contract document and provide a name</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="docFile">Upload Document</Label>
          <Input id="docFile" type="file" onChange={handleFileChange} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="contractName">Contract Name</Label>
          <Input
            id="contractName"
            type="text"
            placeholder="Contract Name"
            value={formData.contractName}
            onChange={(e) => updateFormData("contractName", e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}

