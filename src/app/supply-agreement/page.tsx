"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { Signer1Step } from "@/components/supply-agreement/signer1-step"
import { Signer2Step } from "@/components/supply-agreement/signer2-step"
import { CCStep } from "@/components/supply-agreement/cc-step"
import { ContractStep } from "@/components/supply-agreement/contract-step"
import { CompanyStep } from "@/components/supply-agreement/company-step"
import { SupplierStep } from "@/components/supply-agreement/supplier-step"
import { ProductsStep } from "@/components/supply-agreement/products-step"
import { SupplierSignatureStep } from "@/components/supply-agreement/supplier-signature-step"
import { CompanySignatureStep } from "@/components/supply-agreement/company-signature-step"
import { OthersStep } from "@/components/supply-agreement/others-step"
import { ReviewStep } from "@/components/supply-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type FormData = {
  signer1Email: string
  signer1Name: string
  signer1ClientId: string
  signer2Email: string
  signer2Name: string
  signer2ClientId: string
  ccEmail: string
  ccName: string
  docFile: File | null
  contractName: string
  company: {
    name: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  supplier: {
    name: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    date: string
  }
  products: Array<{ name: string; description: string; price: string }>
  deliveryDays: string
  terminationNoticeDays: string
  remedyPeriodDays: string
  paymentTermDays: string
  interestRate: string
  warrantyPeriod: string
  governingState: string
  supplierSignature: {
    signature: string
    firstName: string
    lastName: string
    date: string
  }
  companySignature: {
    signature: string
    firstName: string
    lastName: string
    date: string
  }
}

export default function SupplyAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    signer1Email: "",
    signer1Name: "",
    signer1ClientId: "",
    signer2Email: "",
    signer2Name: "",
    signer2ClientId: "",
    ccEmail: "",
    ccName: "",
    docFile: null,
    contractName: "",
    company: {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    supplier: {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      date: "",
    },
    products: [{ name: "", description: "", price: "" }],
    deliveryDays: "",
    terminationNoticeDays: "",
    remedyPeriodDays: "",
    paymentTermDays: "",
    interestRate: "",
    warrantyPeriod: "",
    governingState: "",
    supplierSignature: {
      signature: "",
      firstName: "",
      lastName: "",
      date: "",
    },
    companySignature: {
      signature: "",
      firstName: "",
      lastName: "",
      date: "",
    },
  })
  const { toast } = useToast()

  const steps = [
    Signer1Step,
    Signer2Step,
    CCStep,
    ContractStep,
    CompanyStep,
    SupplierStep,
    ProductsStep,
    SupplierSignatureStep,
    CompanySignatureStep,
    OthersStep,
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
      description: `Are you sure you want to submit this supply agreement to ${apiEndpoint}?`,
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
        throw new Error("Failed to submit supply agreement")
      }

      const data = await response.json()
      localStorage.setItem("supplyAgreementData", JSON.stringify(formData))
      toast({
        title: "Supply Agreement Submitted",
        description: `Your supply agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the supply agreement. Please try again.",
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
    const savedData = localStorage.getItem("supplyAgreementData")
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
      <div className="flex justify-end mb-4">
        <Button onClick={prepopulateForm}>Prepopulate Form</Button>
      </div>
      <div className="w-full xl:w-4/5 mx-auto">
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
    </div>
  )
}

