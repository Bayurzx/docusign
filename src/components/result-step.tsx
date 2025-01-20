import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultStepProps {
  formData: {
    name: string
    title: string
    description: string
    image: File | null
  }
}

export function ResultStep({ formData }: ResultStepProps) {
  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Review Your Document</CardTitle>
        <CardDescription>Please review your document details before submitting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Name:</h3>
          <p>{formData.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Document Title:</h3>
          <p>{formData.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Description:</h3>
          <p className="max-h-24 overflow-y-auto">{formData.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Image:</h3>
          {formData.image ? (
            <div className="mt-2 max-w-xs">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Document cover"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          ) : (
            <p>No image uploaded</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

