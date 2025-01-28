// components/LoadingSpinner.tsx
"use client"

import { Loader2 } from "lucide-react"

interface SpinnerProps {
 show: boolean
}

export const LoadingSpinner = ({ show }: SpinnerProps) => {
 if (!show) return null

 return (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
     <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
     <div className="relative">
       <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
     </div>
   </div>
 )
}

