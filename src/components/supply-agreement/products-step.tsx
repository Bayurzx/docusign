import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

interface ProductsStepProps {
  formData: {
    products: Array<{ name: string; description: string; price: string }>
  }
  updateFormData: (key: string, value: Array<{ name: string; description: string; price: string }>) => void
  onEnterPress: () => void
}

export function ProductsStep({ formData, updateFormData, onEnterPress }: ProductsStepProps) {
  const [products, setProducts] = useState(formData.products)

  const handleAddProduct = () => {
    const newProducts = [...products, { name: "", description: "", price: "" }]
    setProducts(newProducts)
    updateFormData("products", newProducts)
  }

  const handleRemoveProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index)
    setProducts(newProducts)
    updateFormData("products", newProducts)
  }

  const handleProductChange = (index: number, field: string, value: string) => {
    const newProducts = [...products]
    newProducts[index] = { ...newProducts[index], [field]: value }
    setProducts(newProducts)
    updateFormData("products", newProducts)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Products
        </CardTitle>
        <CardDescription>Add products to the supply agreement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleProductChange(index, "name", e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              placeholder="Description"
              value={product.description}
              onChange={(e) => handleProductChange(index, "description", e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              placeholder="Price"
              value={product.price}
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="outline" size="icon" onClick={() => handleRemoveProduct(index)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </CardContent>
    </Card>
  )
}

