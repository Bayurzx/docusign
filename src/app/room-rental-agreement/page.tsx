"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { ContractStep } from "@/components/room-rental-agreement/contract-step"
import { HouseownerStep } from "@/components/room-rental-agreement/houseowner-step"
import { RenterStep } from "@/components/room-rental-agreement/renter-step"
import { AddressStep } from "@/components/room-rental-agreement/address-step"
import { TermsStep } from "@/components/room-rental-agreement/terms-step"
import { UtilitiesStep } from "@/components/room-rental-agreement/utilities-step"
import { FixturesStep } from "@/components/room-rental-agreement/fixtures-step"
import { GoverningLawStep } from "@/components/room-rental-agreement/governing-law-step"
import { ReviewStep } from "@/components/room-rental-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { HtmlPreviewModal } from "@/components/html-preview-modal"

type FormData = {
  contractName: string
  houseowner: {
    firstName: string
    lastName: string
  }
  renter: {
    firstName: string
    lastName: string
  }
  address: {
    streetAddress: string
    streetAddressLine2: string
    city: string
    stateProvince: string
    postalCode: string
    country: string
  }
  terms: {
    startDate: string
    noticePeriod: string
    rent: string
    paymentMethod: string
    paymentDay: string
  }
  utilities: {
    gasElectricity: number
    water: number
    garbage: number
    internet: number
    cableTV: number
    otherLiability: number
  }
  fixtures: {
    list: string[]
    depositAmount: string
  }
  governingLaw: {
    state: string
  }
  signatures: {
    renterDate: string
    houseownerDate: string
  }
}

export default function RoomRentalAgreement() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    contractName: "Room Rental Agreement",
    houseowner: {
      firstName: "",
      lastName: "",
    },
    renter: {
      firstName: "",
      lastName: "",
    },
    address: {
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
    terms: {
      startDate: "",
      noticePeriod: "",
      rent: "",
      paymentMethod: "",
      paymentDay: "",
    },
    utilities: {
      gasElectricity: 0,
      water: 0,
      garbage: 0,
      internet: 0,
      cableTV: 0,
      otherLiability: 0,
    },
    fixtures: {
      list: [],
      depositAmount: "",
    },
    governingLaw: {
      state: "",
    },
    signatures: {
      renterDate: new Date().toLocaleDateString(),
      houseownerDate: new Date().toLocaleDateString(),
    },
  })
  const { toast } = useToast()

  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false)
  const pageIdentifier = "room-rental-agreement"

  const openHtmlModal = () => {
    setIsHtmlModalOpen(true)
  }

  const steps = [
    ContractStep,
    HouseownerStep,
    RenterStep,
    AddressStep,
    TermsStep,
    UtilitiesStep,
    FixturesStep,
    GoverningLawStep,
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
      description: `Are you sure you want to submit this room rental agreement to ${apiEndpoint}?`,
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
        throw new Error("Failed to submit room rental agreement")
      }

      const data = await response.json()
      localStorage.setItem("roomRentalAgreementData", JSON.stringify(formData))
      toast({
        title: "Room Rental Agreement Submitted",
        description: `Your room rental agreement has been successfully submitted to ${apiEndpoint}.`,
      })
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to submit the room rental agreement. Please try again.",
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
    const savedData = localStorage.getItem("roomRentalAgreementData")
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
      <HtmlPreviewModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
        pageIdentifier={pageIdentifier}
      />
    </div>
  )
}

