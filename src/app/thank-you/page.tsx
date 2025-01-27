"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useRouter } from "next/navigation"

export default function ThankYouPage() {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/redirect")
    }, 5000) // Redirect to countdown page after 5 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Confetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={200} />
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-xl mb-8">Your submission has been received.</p>
      <p className="text-lg">Redirecting to home page in 5 seconds...</p>
    </div>
  )
}

