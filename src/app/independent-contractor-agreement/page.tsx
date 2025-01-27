"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/independent-contractor-agreement/contract-step"
import { ContractorStep } from "@/components/independent-contractor-agreement/contractor-step"
import { ClientStep } from "@/components/independent-contractor-agreement/client-step"
import { DetailsStep } from "@/components/independent-contractor-agreement/details-step"
import { PaymentStep } from "@/components/independent-contractor-agreement/payment-step"
import { ReviewStep } from "@/components/independent-contractor-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { HtmlPreviewModal } from "@/components/html-preview-modal"

type FormData = {
  contract: {
    name: string
    date: {
      day: number
      month: string
      year: number
    }
    governing_law: string
  }
  contractor: {
    name: string
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
    signature_date: string
  }
  client: {
    name: string
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
    signature_date: string
  }
  subject: string
  scope_of_work: string
  term: {
    duration: string
    start_date: string
    end_date: string
  }
  termination: {
    notice_period_days: number
  }
  payment: {
    total_amount: string
    schedule: {
      initial_payment: {
        date: string
        amount: string
      }
      first_payment: {
        date: string
        amount: string
      }
      second_payment: {
        date: string
        amount: string
      }
      final_payment: {
        date: string
        amount: string
      }
    }
    late_payment_interest: string
  }
}

export default function IndependentContractorAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    contract: {
      name: "Independent Contractor Agreement",
      date: {
        day: new Date().getDate(),
        month: new Date().toLocaleString("default", { month: "long" }),
        year: new Date().getFullYear(),
      },
      governing_law: "",
    },
    contractor: {
      name: "",
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
      signature_date: new Date().toLocaleDateString(),
    },
    client: {
      name: "",
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
      signature_date: new Date().toLocaleDateString(),
    },
    subject: "",
    scope_of_work: "",
    term: {
      duration: "",
      start_date: "",
      end_date: "",
    },
    termination: {
      notice_period_days: 30,
    },
    payment: {
      total_amount: "",
      schedule: {
        initial_payment: {
          date: "",
          amount: "",
        },
        first_payment: {
          date: "",
          amount: "",
        },
        second_payment: {
          date: "",
          amount: "",
        },
        final_payment: {
          date: "",
          amount: "",
        },
      },
      late_payment_interest: "",
    },
  })
  const { toast } = useToast()

  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false)
  const pageIdentifier = "independent-contractor-agreement"

  const openHtmlModal = () => {
    setIsHtmlModalOpen(true)
  }

  const steps = [ContractStep, ContractorStep, ClientStep, DetailsStep, PaymentStep, ReviewStep]
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
      description: `Are you sure you want to submit this independent contractor agreement to ${apiEndpoint}?`,
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
        throw new Error("Failed to submit independent contractor agreement")
      }

      const data = await response.json()
      localStorage.setItem("independentContractorAgreementData", JSON.stringify(formData))
      toast({
        title: "Independent Contractor Agreement Submitted",
        description: `Your independent contractor agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the independent contractor agreement. Please try again.",
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
    const savedData = localStorage.getItem("independentContractorAgreementData")
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

