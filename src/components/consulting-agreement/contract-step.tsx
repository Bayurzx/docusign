import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ContractStepProps {
  formData: {
    contract: {
      name: string
      current_date: string
      date: string
      start_date: string
      services: string[]
    }
  }
  updateFormData: (key: string, value: any) => void
  onEnterPress: () => void
}

export function ContractStep({ formData, updateFormData, onEnterPress }: ContractStepProps) {
  const [newService, setNewService] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEnterPress()
    }
  }

  const addService = () => {
    if (newService.trim() !== "") {
      updateFormData("contract.services", [...formData.contract.services, newService.trim()])
      setNewService("")
    }
  }

  const removeService = (index: number) => {
    const updatedServices = formData.contract.services.filter((_, i) => i !== index)
    updateFormData("contract.services", updatedServices)
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Contract Information
        </CardTitle>
        <CardDescription>Enter the details for the consulting contract</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Contract Name"
          value={formData.contract.name}
          onChange={(e) => updateFormData("contract.name", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.contract.date}
          onChange={(e) => updateFormData("contract.date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="date"
          placeholder="Start Date"
          value={formData.contract.start_date}
          onChange={(e) => updateFormData("contract.start_date", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div>
          <h3 className="font-semibold mb-2">Services</h3>
          {formData.contract.services.map((service, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="flex-grow">{service}</span>
              <Button variant="outline" size="sm" onClick={() => removeService(index)}>
                Remove
              </Button>
            </div>
          ))}
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Add a service"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={addService}>Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

