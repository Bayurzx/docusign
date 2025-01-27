"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function RedirectPage() {
  const [countdown, setCountdown] = useState(7)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push("/")
    }
  }, [countdown, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Redirecting...</h1>
      <p className="text-2xl mb-8">You will be redirected to the home page in:</p>
      <div className="text-6xl font-bold">{countdown}</div>
    </div>
  )
}

