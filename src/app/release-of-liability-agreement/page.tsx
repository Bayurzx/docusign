"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/release-of-liability-agreement/contract-step"
import { ReleasorStep } from "@/components/release-of-liability-agreement/releasor-step"
import { ReleaseeStep } from "@/components/release-of-liability-agreement/releasee-step"
import { ReviewStep } from "@/components/release-of-liability-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { HtmlPreviewModal } from "@/components/html-preview-modal"

type FormData = {
  date: string
  amount: string
  stateName: string
  witnessDate: string
  contractName: string
  releasor: {
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    signature: string
    signatureDate: string
  }
  releasee: {
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    signature: string
    signatureDate: string
  }
}

export default function ReleaseOfLiabilityAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toLocaleDateString(),
    amount: "",
    stateName: "",
    witnessDate: new Date().toISOString().split("T")[0],
    contractName: "Release of Liability Agreement",
    releasor: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      signature: "",
      signatureDate: new Date().toISOString().split("T")[0],
    },
    releasee: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      signature: "",
      signatureDate: new Date().toISOString().split("T")[0],
    },
  })
  const { toast } = useToast()

  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false)
  const pageIdentifier = "release-of-liability-agreement"

  const openHtmlModal = () => {
    setIsHtmlModalOpen(true)
  }

  const steps = [ContractStep, ReleasorStep, ReleaseeStep, ReviewStep]
  const CurrentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = (apiEndpoint: string) => {
    toast({
      title: "Confirm Submission",
      description: `Are you sure you want to submit this release of liability agreement to ${apiEndpoint}?`,
      action: <Button onClick={() => finalSubmit(apiEndpoint)}>Confirm</Button>,
    })
  }

  const finalSubmit = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit release of liability agreement")
      }

      const data = await response.json()
      localStorage.setItem("releaseOfLiabilityAgreementData", JSON.stringify(formData))
      toast({
        title: "Release of Liability Agreement Submitted",
        description: `Your release of liability agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the release of liability agreement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = key.split(".")
      let current: any = newData
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const prepopulateForm = () => {
    const savedData = localStorage.getItem("releaseOfLiabilityAgreementData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
      toast({
        title: "Form Prepopulated",
        description: "The form has been filled with saved data.",
      })
    } else {
      toast({
        title: "No Saved Data",
        description: "There is no saved data to prepopulate the form.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <Button onClick={openHtmlModal}>Preview HTML</Button>
        <Button onClick={prepopulateForm}>Prepopulate Form</Button>
      </div>
      <div className="w-full xl:w-5/6 mx-auto">
        <ProgressBar currentStep={step} totalSteps={steps.length} />
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStep
                formData={formData}
                updateFormData={updateFormData}
                onEnterPress={handleNext}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
      <HtmlPreviewModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
        pageIdentifier={pageIdentifier}
      />
    </div>
  )
}

