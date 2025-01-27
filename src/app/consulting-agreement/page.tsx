"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/consulting-agreement/contract-step"
import { TermsStep } from "@/components/consulting-agreement/terms-step"
import { ConsultantStep } from "@/components/consulting-agreement/consultant-step"
import { ClientStep } from "@/components/consulting-agreement/client-step"
import { ReviewStep } from "@/components/consulting-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type FormData = {
  contract: {
    name: string
    current_date: string
    date: string
    start_date: string
    services: string[]
  }
  terms: {
    jurisdiction: string
    duration: string
    payment_method: string
    amount: string
    late_fee: string
    penalty: string
    time_period: string
  }
  consultant: {
    company_name: string
    full_name: {
      first_name: string
      last_name: string
    }
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
    state: string
    country: string
    geographical_area: string
  }
  client: {
    company_name: string
    full_name: {
      first_name: string
      last_name: string
    }
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
    state: string
    country: string
  }
}

export default function ConsultingAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    contract: {
      name: "Consulting Agreement",
      current_date: new Date().toLocaleDateString(),
      date: "",
      start_date: "",
      services: [],
    },
    terms: {
      jurisdiction: "",
      duration: "",
      payment_method: "",
      amount: "",
      late_fee: "",
      penalty: "",
      time_period: "",
    },
    consultant: {
      company_name: "",
      full_name: {
        first_name: "",
        last_name: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      state: "",
      country: "",
      geographical_area: "",
    },
    client: {
      company_name: "",
      full_name: {
        first_name: "",
        last_name: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      state: "",
      country: "",
    },
  })
  const { toast } = useToast()

  const steps = [ContractStep, TermsStep, ConsultantStep, ClientStep, ReviewStep]
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
      description: `Are you sure you want to submit this consulting agreement to ${apiEndpoint}?`,
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
        throw new Error("Failed to submit consulting agreement")
      }

      const data = await response.json()
      localStorage.setItem("consultingAgreementData", JSON.stringify(formData))
      toast({
        title: "Consulting Agreement Submitted",
        description: `Your consulting agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the consulting agreement. Please try again.",
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
    const savedData = localStorage.getItem("consultingAgreementData")
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
    </div>
  )
}

