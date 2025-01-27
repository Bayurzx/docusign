import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${BASE_URL}/signing/embedded`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          envelopeId: data.envelopeId,
          redirectUrl: data.redirectUrl,
          message: "Envelope created and ready for signing",
        },
        { status: 200 },
      )
    } else {
      throw new Error(data.message || "An error occurred during the signing process")
    }
  } catch (error: any) {
    console.error("Error in embedded signing:", error)

    if (error.isAuthenticationError) {
      return NextResponse.json(
        {
          success: false,
          errorCode: error.details?.reason || "AUTHENTICATION_ERROR",
          errorMessage: error.message,
          details: error.details,
        },
        { status: 401 },
      )
    }

    // Handle other errors
    const status = error.response?.status || 500
    const errorCode = error.response?.body?.errorCode || "UNKNOWN_ERROR"
    const errorMessage = error.response?.body?.message || error.message

    return NextResponse.json(
      {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      },
      { status: status },
    )
  }
}

