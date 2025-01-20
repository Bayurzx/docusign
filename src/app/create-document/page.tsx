'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ProgressBar } from '@/components/progress-bar'
import { NameStep } from '@/components/create-document/name-step'
import { TitleStep } from '@/components/create-document/title-step'
import { DescriptionStep } from '@/components/create-document/description-step'
import { ImageStep } from '@/components/create-document/image-step'
import { ResultStep } from '@/components/create-document/result-step'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

type FormData = {
  name: string
  title: string
  description: string
  image: File | null
}

export default function CreateDocument() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    description: '',
    image: null
  })
  const { toast } = useToast()

  const steps = [NameStep, TitleStep, DescriptionStep, ImageStep, ResultStep]
  const CurrentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = () => {
    toast({
      title: "Confirm Submission",
      description: "Are you sure you want to submit this document?",
      action: (
        <Button onClick={finalSubmit}>
          Confirm
        </Button>
      ),
    })
  }

  const finalSubmit = () => {
    console.log('Form submitted:', formData)
    toast({
      title: "Document Submitted",
      description: "Your document has been successfully submitted.",
    })
    // Here you would typically send the data to your backend
  }

  const updateFormData = (key: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full xl:w-3/4 lg:w-5/6 md:w-11/12 mx-auto">
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
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

