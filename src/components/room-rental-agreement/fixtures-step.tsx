import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormValueRoomRentalAgreement } from "@/types"

interface FixturesStepProps {
  formData: {
    fixtures: {
      list: string[]
      depositAmount: string
    }
  }
  updateFormData: (key: string, value: FormValueRoomRentalAgreement) => void
  onEnterPress: () => void
}

export function FixturesStep({ formData, updateFormData, onEnterPress }: FixturesStepProps) {
  const [newFixture, setNewFixture] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (newFixture) {
        addFixture()
      } else {
        onEnterPress()
      }
    }
  }

  const addFixture = () => {
    if (newFixture) {
      updateFormData("fixtures.list", [...formData.fixtures.list, newFixture])
      setNewFixture("")
    }
  }

  const removeFixture = (index: number) => {
    const newList = formData.fixtures.list.filter((_, i) => i !== index)
    updateFormData("fixtures.list", newList)
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Fixtures and Deposit
        </CardTitle>
        <CardDescription>Enter the fixtures included and deposit amount</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="fixtures" className="block text-sm font-medium text-gray-500 mb-1">
            Fixtures
          </label>
          <div className="flex space-x-2">
            <Input
              id="fixtures"
              type="text"
              placeholder="e.g., Refrigerator"
              value={newFixture}
              onChange={(e) => setNewFixture(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={addFixture}>Add</Button>
          </div>
          <ul className="mt-2 space-y-1">
            {formData.fixtures.list.map((fixture, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{fixture}</span>
                <Button variant="destructive" size="sm" onClick={() => removeFixture(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-500 mb-1">
            Deposit Amount
          </label>
          <Input
            id="depositAmount"
            type="text"
            placeholder="e.g., 3000"
            value={formData.fixtures.depositAmount}
            onChange={(e) => updateFormData("fixtures.depositAmount", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  )
}

