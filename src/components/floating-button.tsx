'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Play, Pause } from 'lucide-react'

interface FloatingButtonProps {
  onToggle: (isPaused: boolean) => void
}

export function FloatingButton({ onToggle }: FloatingButtonProps) {
  const [isPaused, setIsPaused] = useState(false)

  const handleClick = () => {
    setIsPaused(!isPaused)
    onToggle(!isPaused)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
      onClick={handleClick}
      aria-label={isPaused ? "Start animation" : "Pause animation"}
    >
      {isPaused ? (
        <Play className="h-4 w-4" />
      ) : (
        <Pause className="h-4 w-4" />
      )}
    </Button>
  )
}

