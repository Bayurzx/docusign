"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/subscription-agreement/contract-step"
import { CompanyStep } from "@/components/subscription-agreement/company-step"
import { InvestorStep } from "@/components/subscription-agreement/investor-step"
import { SubscriptionStep } from "@/components/subscription-agreement/subscription-step"
import { LegalClosingStep } from "@/components/subscription-agreement/legal-closing-step"
import { SignaturesStep } from "@/components/subscription-agreement/signatures-step"
import { ReviewStep } from "@/components/subscription-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { HtmlPreviewModal } from "@/components/html-preview-modal"
import { FormDataSubscriptionAgreement, FormValueSubscriptionAgreement } from "@/types"
import { convertToFileName, splitAndUseParts } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from "@/components/ui/spinner"


export default function SubscriptionAgreement() {
  const [isLoading, setIsLoading] = useState(false)

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormDataSubscriptionAgreement>({
    date: new Date().toLocaleDateString(),
    contractName: "Subscription Agreement",
    company: {
      name: "",
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      email: "",
      phoneNumber: "",
    },
    investor: {
      name: "",
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      email: "",
      phoneNumber: "",
    },
    subscription: {
      numberOfShares: "",
      purchasePrice: "",
      paymentPeriod: "",
      deliveryPeriod: "",
    },
    closing: {
      date: "",
    },
    legal: {
      stateCountry: "",
      jurisdiction: "",
    },
    signatures: {
      company: {
        name: "",
        date: "",
        signature: "",
      },
      investor: {
        name: "",
        date: "",
        signature: "",
      },
    },
  })
  const { toast } = useToast()
  const pathname = usePathname();
  const pathHtml = pathname.slice(1); // Removes the leading slash  


  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false)
  const pageIdentifier = "subscription-agreement"

  const openHtmlModal = () => {
    setIsHtmlModalOpen(true)
  }

  const steps = [
    ContractStep,
    CompanyStep,
    InvestorStep,
    SubscriptionStep,
    LegalClosingStep,
    SignaturesStep,
    ReviewStep,
  ]
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
      description: `Are you sure you want to submit this subscription agreement to ${splitAndUseParts(apiEndpoint)}?`,
      action: <Button onClick={() => finalSubmit(apiEndpoint)} disabled={isLoading}>Confirm</Button>,
    })
  }

  const finalSubmit = async (apiEndpoint: string) => {
    setIsLoading(true)
    try {
      formData.contractName = convertToFileName(pathHtml)
      formData.signer1Email = formData.company.email
      formData.signer1Name = formData.company.name
      formData.signer2Email = formData.investor.email
      formData.signer2Name = formData.investor.name

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit subscription agreement")
      }

      const data = await response.json()
      localStorage.setItem("subscriptionAgreementData", JSON.stringify(formData))
      toast({
        title: "Subscription Agreement Submitted",
        description: `Your subscription agreement has been successfully submitted to ${splitAndUseParts(apiEndpoint)}.`,
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
        description: "Failed to submit the subscription agreement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (key: string, value: FormValueSubscriptionAgreement) => {
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
      return newData as FormDataSubscriptionAgreement;
    });
  };

  const prepopulateForm = () => {
    const savedData = localStorage.getItem("subscriptionAgreementData")
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
      <div className="w-full xl:w-3/4 mx-auto">
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

