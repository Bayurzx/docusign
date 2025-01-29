import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function POST() {
  try {
    const response = await fetch(`${BASE_URL}/signing/ping`, {
      method: "POST",
    })

    if (response.ok) {
      return new NextResponse("OK", { status: 200 })
    } else {
      throw new Error("Error processing ping")
    }
  } catch (error) {
    console.error("Error in ping:", error)
    return new NextResponse("Error processing ping", { status: 500 })
  }
}

