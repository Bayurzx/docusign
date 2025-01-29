import { ErrorResponse } from "@/types"
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
  } catch (error) {
    const err = error as ErrorResponse; // Specify the type of `error`
    console.error("Error in signing start:", err);

    return NextResponse.json(
      {
        success: false,
        errorCode: err.response?.body?.errorCode || "UNKNOWN_ERROR",
        errorMessage: err.response?.body?.message || err.message || "An unknown error occurred",
      },
      { status: err.response?.status || 500 },
    );
  }
}
