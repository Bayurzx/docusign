"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/licensing-agreement/contract-step"
import { AgreementStep } from "@/components/licensing-agreement/agreement-step"
import { LicensorStep } from "@/components/licensing-agreement/licensor-step"
import { LicenseeStep } from "@/components/licensing-agreement/licensee-step"
import { ReviewStep } from "@/components/licensing-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { HtmlPreviewModal } from "@/components/html-preview-modal"
import { FormDataLicensingAgreement, FormValueLicensingAgreement } from "@/types"
import { convertToFileName, splitAndUseParts } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from "@/components/ui/spinner"



export default function LicensingAgreement() {
  const [isLoading, setIsLoading] = useState(false)

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormDataLicensingAgreement>({
    agreement: {
      executionDate: "",
      governingState: "",
      termDuration: "",
      termDurationInNumbers: "",
      termType: "",
      rateTransactionInNumbers: "",
      rateTransactionInWords: "",
    },
    licensor: {
      companyName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      signature: {
        email: "",
        firstName: "",
        lastName: "",
        position: "",
        date: "",
      },
    },
    licensee: {
      companyName: "",
      typeOfCompany: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      signature: {
        email: "",
        firstName: "",
        lastName: "",
        position: "",
        date: "",
      },
    },
    software: {
      copyrightProduct: "",
    },
    contractName: "Licensing Agreement",
    contractType: "Software Licensing Agreement",
  })
  const { toast } = useToast()
  const pathname = usePathname();
  const pathHtml = pathname.slice(1); // Removes the leading slash  

  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false)
  const pageIdentifier = "licensing-agreement"

  const openHtmlModal = () => {
    setIsHtmlModalOpen(true)
  }

  const steps = [ContractStep, AgreementStep, LicensorStep, LicenseeStep, ReviewStep]
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
      description: `Are you sure you want to submit this licensing agreement to ${splitAndUseParts(apiEndpoint)}?`,
      action: <Button onClick={() => finalSubmit(apiEndpoint)} disabled={isLoading}>Confirm</Button>,
    })
  }

  const finalSubmit = async (apiEndpoint: string) => {
    setIsLoading(true)
    try {
      formData.contractName = convertToFileName(pathHtml)
      formData.signer1Email = formData.licensor.signature.email
      formData.signer1Name = formData.licensor.signature.firstName + " " + formData.licensor.signature.lastName
      formData.signer2Email = formData.licensee.signature.email
      formData.signer2Name = formData.licensee.signature.firstName + " " + formData.licensee.signature.lastName

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit licensing agreement")
      }

      const data = await response.json()
      localStorage.setItem("licensingAgreementData", JSON.stringify(formData))
      toast({
        title: "Licensing Agreement Submitted",
        description: `Your licensing agreement has been successfully submitted to ${splitAndUseParts(apiEndpoint)}.`,
      })
      // Redirect to the provided redirectUrl from either the embedded or responsive response
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl
        // window.open(data.redirectUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the licensing agreement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (key: string, value: FormValueLicensingAgreement) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const keys = key.split('.');

      let current: Record<string, unknown> = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        const keyPart = keys[i];
        if (!(current[keyPart] instanceof Object)) {
          current[keyPart] = {};
        }
        current = current[keyPart] as Record<string, unknown>;
      }

      const finalKey = keys[keys.length - 1];
      current[finalKey] = value;
      return newData as FormDataLicensingAgreement;
    });
  };

  const prepopulateForm = () => {
    const savedData = localStorage.getItem("licensingAgreementData")
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
      <LoadingSpinner show={isLoading} />
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

