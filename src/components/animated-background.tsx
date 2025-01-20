'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface AnimatedDotProps {
  style: React.CSSProperties
  isAnimationPaused: boolean
}

interface AnimatedBackgroundProps {
  isAnimationPaused: boolean
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({ style, isAnimationPaused }) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDarkMode = theme === 'dark'

  return (
    <div
      className={`animated-dot ${isAnimationPaused ? 'paused' : ''}`}
      style={{
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: isDarkMode ? '#4299e1' : '#faca15',
        boxShadow: isDarkMode
          ? '0 0 2px #4299e1, 0 0 4px #4299e1'
          : '0 0 2px #faca15, 0 0 4px #faca15',
        ...style,
      }}
    />
  )
}

export function AnimatedBackground({ isAnimationPaused }: AnimatedBackgroundProps) {
  const [dots, setDots] = useState<React.CSSProperties[]>([])
  //const [isAnimationPaused, setIsAnimationPaused] = useState(false)

  useEffect(() => {
    const generateDots = () => {
      const newDots = []
      const dotCount = Math.floor((window.innerWidth * window.innerHeight) / 10000)
      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          left: `${Math.random() * 100}%`,
          top: `-10px`,
          animationDuration: `${Math.random() * 7 + 7}s`,
          animationDelay: `${Math.random() * 5}s`,
        })
      }
      setDots(newDots)
    }

    generateDots()
    window.addEventListener('resize', generateDots)
    return () => window.removeEventListener('resize', generateDots)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {dots.map((style, index) => (
        <AnimatedDot key={index} style={style} isAnimationPaused={isAnimationPaused} />
      ))}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
        .animated-dot {
          animation: fall linear infinite;
        }
        .animated-dot.paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

