'use client'

import { useState } from 'react'
import { AnimatedBackground } from './animated-background'
import { FloatingButton } from './floating-button'

export function AnimationWrapper({ children }: { children: React.ReactNode }) {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)

  return (
    <>
      <AnimatedBackground isAnimationPaused={isAnimationPaused} />
      {children}
      <FloatingButton onToggle={setIsAnimationPaused} />
    </>
  )
}

