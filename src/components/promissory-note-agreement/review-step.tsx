import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormDataPromissoryNoteAgreement } from "@/types"

interface ReviewStepProps {
  formData: FormDataPromissoryNoteAgreement
  handleSubmit: (apiEndpoint: string) => void
}

export function ReviewStep({ formData, handleSubmit }: ReviewStepProps) {
  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Review Promissory Note Agreement
        </CardTitle>
        <CardDescription>Please review the information before submitting</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <pre className="bg-gray-100 text-black p-4 rounded-md overflow-auto max-h-96 flex-grow">
          {JSON.stringify(formData, null, 2)}
        </pre>
        <div className="flex flex-col space-y-4">
          <Button onClick={() => handleSubmit("/api/signing/responsive")} className="bg-green-500 hover:bg-green-600">
            Responsive Signing
          </Button>
          <Button onClick={() => handleSubmit("/api/signing/remote-html")} className="bg-blue-500 hover:bg-blue-600">
            Remote Signing
          </Button>
          <Button onClick={() => handleSubmit("/api/signing/embedded")} className="bg-yellow-500 hover:bg-yellow-600">
            Embedded Signing
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

