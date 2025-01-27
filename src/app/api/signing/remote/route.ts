import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${BASE_URL}/signing/remote`, {
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
          envelopeId: result.envelopeId,
          message: `Envelope was created and sent. EnvelopeId: ${result.envelopeId}`,
        },
        { status: 200 },
      )
    } else {
      throw new Error(result.message || "An error occurred during the remote signing process")
    }
  } catch (error: any) {
    console.error("Error in remote signing:", error)

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

