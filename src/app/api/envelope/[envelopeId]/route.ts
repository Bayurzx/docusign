import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(request: Request, { params }: { params: { envelopeId: string } }) {
  try {
    const { envelopeId } = params

    const response = await fetch(`${BASE_URL}/envelope/${envelopeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          envelope: result,
        },
        { status: 200 },
      )
    } else {
      throw new Error("Failed to fetch envelope")
    }
  } catch (error: any) {
    console.error("Error in fetching envelope:", error)

    return NextResponse.json(
      {
        success: false,
        errorCode: error.response?.body?.errorCode || "UNKNOWN_ERROR",
        errorMessage: error.response?.body?.message || error.message,
      },
      { status: error.response?.status || 500 },
    )
  }
}

