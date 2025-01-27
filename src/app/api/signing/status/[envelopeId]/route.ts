import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(request: Request, { params }: { params: { envelopeId: string } }) {
  try {
    const { envelopeId } = params

    const response = await fetch(`${BASE_URL}/signing/status/${envelopeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const status = await response.json()

    if (response.ok) {
      return NextResponse.json(status, { status: 200 })
    } else {
      throw new Error("Failed to fetch signing status")
    }
  } catch (error: any) {
    console.error("Error in fetching signing status:", error)

    return NextResponse.json(
      {
        success: false,
        errorMessage: error.message,
      },
      { status: 500 },
    )
  }
}

