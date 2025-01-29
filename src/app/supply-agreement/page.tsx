"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { Signer1Step } from "@/components/supply-agreement/signer1-step"
import { Signer2Step } from "@/components/supply-agreement/signer2-step"
// import { CCStep } from "@/components/supply-agreement/cc-step"
// import { ContractStep } from "@/components/supply-agreement/contract-step"
import { CompanyStep } from "@/components/supply-agreement/company-step"
import { SupplierStep } from "@/components/supply-agreement/supplier-step"
import { ProductsStep } from "@/components/supply-agreement/products-step"
import { SupplierSignatureStep } from "@/components/supply-agreement/supplier-signature-step"
import { CompanySignatureStep } from "@/components/supply-agreement/company-signature-step"
import { OthersStep } from "@/components/supply-agreement/others-step"
import { ReviewStep } from "@/components/supply-agreement/review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/spinner"
import { convertToFileName, splitAndUseParts } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { FormDataSupplyAgreement, FormValueSupplyAgreement } from "@/types"




export default function SupplyAgreement() {
  const [isLoading, setIsLoading] = useState(false)

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormDataSupplyAgreement>({
    signer1Email: "bayurzx@gmail.com",
    signer1Name: "John Boe",
    // signer1ClientId: "bayurzx@gmail.com",
    signer2Email: "yemiade5700@gmail.com",
    signer2Name: "Ade Yemi",
    // signer2ClientId: "yemiade5700@gmail.com",
    // ccEmail: "docutest@iglumtech.com",
    // ccName: "DocuTest",
    // docFile: null,
    // contractName: "Supply Agreement.html",
    company: {
      name: "Iglum Innovators Inc",
      street: "123 Innovation Drive",
      city: "Tech Bay",
      state: "California",
      postalCode: "90021",
      country: "USA",
    },
    supplier: {
      name: "Global Supplies Ltd.",
      street: "456 Supply Lane",
      city: "Supply Town",
      state: "New York",
      postalCode: "10001",
      country: "USA",
      date: "2025-01-10",
    },
    products: [
      { "name": "Laptop", "description": "High-performance laptop", "price": "1200" },
      { "name": "Monitor", "description": "27-inch 4K monitor", "price": "600" },
      { "name": "Mouse", "description": "Wireless ergonomic mouse", "price": "30" },
      { "name": "Keyboard", "description": "Mechanical gaming keyboard", "price": "80" }
    ],
    deliveryDays: "30",
    terminationNoticeDays: "60",
    remedyPeriodDays: "15",
    paymentTermDays: "30",
    interestRate: "5",
    warrantyPeriod: "12",
    governingState: "California",
    supplierSignature: {
      signature: "John Boe",
      firstName: "John",
      lastName: "Boe",
      date: "2025-01-10",
    },
    companySignature: {
      signature: "Ade Yemi",
      firstName: "Ade",
      lastName: "Yemi",
      date: "2025-01-10",
    },
  })
  const { toast } = useToast()
  const pathname = usePathname();
  const pathHtml = pathname.slice(1); // Removes the leading slash

  const steps = [
    Signer1Step,
    Signer2Step,
    // CCStep,
    // ContractStep,
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
      description: `Are you sure you want to submit this supply agreement to ${splitAndUseParts(apiEndpoint)}?`,
      action: <Button onClick={() => finalSubmit(apiEndpoint)} disabled={isLoading}>Confirm</Button>,
    })
  }

  const finalSubmit = async (apiEndpoint: string) => {
    setIsLoading(true)

    try {
      formData.contractName = convertToFileName(pathHtml)
      // formData.docFile = formData.contractName
      
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
        description: `Your supply agreement has been successfully submitted to ${splitAndUseParts(apiEndpoint)}.`,
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
        description: "Failed to submit the supply agreement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // const updateFormData = (key: string, value: any) => {
  //   setFormData((prev) => {
  //     const newData = { ...prev }
  //     const keys = key.split(".")
  //     let current: any = newData
  //     for (let i = 0; i < keys.length - 1; i++) {
  //       current = current[keys[i]]
  //     }
  //     current[keys[keys.length - 1]] = value
  //     return newData
  //   })
  // }


const updateFormData = (key: string, value: FormValueSupplyAgreement) => {
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
    return newData as FormDataSupplyAgreement;
  });
};

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
      <LoadingSpinner show={isLoading} />
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

