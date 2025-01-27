'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ProgressBar } from '@/components/progress-bar'
import { SignerInfoStep } from '@/components/embedded-signing/signer-info-step'
import { ReviewStep } from '@/components/embedded-signing/review-step'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

type FormData = {
  email: string
  name: string
}

export default function EmbeddedSigning() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: ''
  })
  const { toast } = useToast()
  const router = useRouter()

  const steps = [SignerInfoStep, ReviewStep]
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
      description: "Are you sure you want to send the signing request?",
      action: (
        <Button onClick={finalSubmit}>
          Confirm
        </Button>
      ),
    })
  }

  const finalSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signing/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to start signing process')
      }

      const data = await response.json()
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        throw new Error('No redirect URL provided')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to start the signing process. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateFormData = (key: keyof FormData, value: string) => {
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

