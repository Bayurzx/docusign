import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReviewStepProps {
  formData: any
  handleSubmit: (apiEndpoint: string) => void
}

export function ReviewStep({ formData, handleSubmit }: ReviewStepProps) {
  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Review Release of Liability Agreement
        </CardTitle>
        <CardDescription>Please review the information before submitting</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <pre className="bg-gray-100 text-black p-4 rounded-md overflow-auto max-h-96 flex-grow">
          {JSON.stringify(formData, null, 2)}
        </pre>
        <div className="flex flex-col space-y-4">
          <Button onClick={() => handleSubmit("/api/submit-agreement")} className="bg-green-500 hover:bg-green-600">
            Submit Agreement
          </Button>
          <Button onClick={() => handleSubmit("/api/save-draft")} className="bg-blue-500 hover:bg-blue-600">
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit("/api/request-review")} className="bg-yellow-500 hover:bg-yellow-600">
            Request Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

