import { ErrorResponse } from "@/types"
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
  } catch (error) {
    const err = error as ErrorResponse; // Specify the type of `error`
    console.error("Error in fetching envelope:", err);

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
