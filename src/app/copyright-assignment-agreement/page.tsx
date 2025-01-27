"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/copyright-assignment-agreement/contract-step"
import { TransferorStep } from "@/components/copyright-assignment-agreement/transferor-step"
import { TransfereeStep } from "@/components/copyright-assignment-agreement/transferee-step"
import { WorkStep } from "@/components/copyright-assignment-agreement/work-step"
import { ReviewStep } from "@/components/copyright-assignment-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type FormData = {
  contract: {
    name: string
    current_date: string
    governing_law: string
    jurisdiction: string
    execution_date: string
  }
  transferor: {
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature: {
      name: string
      date: string
    }
  }
  transferee: {
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature: {
      name: string
      date: string
    }
  }
  work: {
    name: string
    description: string
  }
}

export default function CopyrightAssignmentAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    contract: {
      name: "Copyright Assignment Agreement",
      current_date: new Date().toLocaleDateString(),
      governing_law: "",
      jurisdiction: "",
      execution_date: new Date().toLocaleDateString(),
    },
    transferor: {
      address: {
        street: "",
        street_line_2: "",
        city: "",
        state: "",
        postal: "",
        country: "",
      },
      phone: "",
      email: "",
      signature: {
        name: "",
        date: new Date().toLocaleDateString(),
      },
    },
    transferee: {
      address: {
        street: "",
        street_line_2: "",
        city: "",
        state: "",
        postal: "",
        country: "",
      },
      phone: "",
      email: "",
      signature: {
        name: "",
        date: new Date().toLocaleDateString(),
      },
    },
    work: {
      name: "",
      description: "",
    },
  })
  const { toast } = useToast()

  const steps = [ContractStep, TransferorStep, TransfereeStep, WorkStep, ReviewStep]
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
      description: `Are you sure you want to submit this copyright assignment agreement to ${apiEndpoint}?`,
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
        throw new Error("Failed to submit copyright assignment agreement")
      }

      const data = await response.json()
      localStorage.setItem("copyrightAssignmentAgreementData", JSON.stringify(formData))
      toast({
        title: "Copyright Assignment Agreement Submitted",
        description: `Your copyright assignment agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the copyright assignment agreement. Please try again.",
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
    const savedData = localStorage.getItem("copyrightAssignmentAgreementData")
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

