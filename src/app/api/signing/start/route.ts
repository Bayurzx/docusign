import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${BASE_URL}/signing/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const result = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          redirectUrl: result.redirectUrl,
          envelopeId: result.envelopeId,
        },
        { status: 200 },
      )
    } else {
      throw new Error(result.message || "An error occurred during the signing start process")
    }
  } catch (error: any) {
    console.error("Error in signing start:", error)

    return NextResponse.json(
      {
        success: false,
        errorCode: error.response?.body?.errorCode || error.response?.data?.errorCode || "UNKNOWN_ERROR",
        errorMessage: error.response?.body?.message || error.response?.data?.message || error.message,
      },
      { status: error.response?.status || 500 },
    )
  }
}

