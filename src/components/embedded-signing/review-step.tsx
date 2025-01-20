import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewStepProps {
  formData: {
    email: string
    name: string
  }
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Review Signer Information</CardTitle>
        <CardDescription>Please review the signer&apos;s information before submitting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Signer Email:</h3>
          <p>{formData.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Signer Name:</h3>
          <p>{formData.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

