import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${BASE_URL}/signing/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const { status, envelopeId } = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          status: status.status,
          message: "Signing process completed",
          envelopeId,
        },
        { status: 200 },
      )
    } else {
      throw new Error("Error processing signing completion")
    }
  } catch (error) {
    console.error("Error in signing complete:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Error processing signing completion",
      },
      { status: 500 },
    )
  }
}

