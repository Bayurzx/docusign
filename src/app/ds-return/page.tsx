"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Info, Loader2 } from "lucide-react"

const eventDescriptions: Record<string, string> = {
  signing_complete: "The document has been signed successfully.",
  access_code_failed: "The access code failed. Please check and try again.",
  cancel: "The signing process was canceled by the user.",
  decline: "The signing process was declined.",
  exception: "An exception occurred during the signing process.",
  fax_pending: "The signing process is pending due to fax requirements.",
  id_check_failed: "Identity check failed. Please verify your information.",
  session_timeout: "The signing session has timed out.",
  ttl_expired: "The signing link has expired.",
  viewing_complete: "The document viewing process is complete.",
}

type StatusType = "loading" | "success" | "info" | "error"

export default function DocuSignReturn() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<StatusType>("loading")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    const event = searchParams.get("event")
    const state = searchParams.get("state")
    const envelopeId = searchParams.get("envelopeId")

    if (!event || !state) {
      setStatus("error")
      setMessage("Invalid return parameters. Please try the signing process again.")
      return
    }

    console.log("State:", state)
    console.log("Envelope ID:", envelopeId)

    if (event === "signing_complete") {
      setStatus("success")
    } else if (event in eventDescriptions) {
      setStatus("info")
    } else {
      setStatus("error")
    }

    setMessage(eventDescriptions[event] || "An unknown signing event occurred.")
  }, [searchParams])

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        )
      case "success":
      case "info":
      case "error":
        const Icon = status === "success" ? CheckCircle : status === "info" ? Info : AlertTriangle
        const color = status === "success" ? "text-green-500" : status === "info" ? "text-blue-500" : "text-red-500"
        const title =
          status === "success" ? "Signing Complete" : status === "info" ? "Signing Information" : "Signing Error"

        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className={`w-6 h-6 ${color}`} />
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              </div>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push("/")}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return <div className="container mx-auto px-4 py-8">{renderContent()}</div>
}

