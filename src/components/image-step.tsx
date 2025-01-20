import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from 'lucide-react'

interface ImageStepProps {
  formData: { image: File | null }
  updateFormData: (key: 'image', value: File | null) => void
  onEnterPress: () => void
}

export function ImageStep({ formData, updateFormData, onEnterPress }: ImageStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onEnterPress()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onEnterPress])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = (file: File) => {
    updateFormData('image', file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Card className="shadow-lg p-8 transition-all duration-300 hover:shadow-xl min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Upload Image</CardTitle>
        <CardDescription>Add a cover image for your document</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors duration-300"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-36 object-contain" />
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Drag & drop or click to upload</p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="image/*"
          />
        </div>
      </CardContent>
    </Card>
  )
}

