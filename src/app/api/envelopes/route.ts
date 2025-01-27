import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = new URLSearchParams(searchParams).toString()

    const response = await fetch(`${BASE_URL}/envelopes?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const results = await response.json()

    if (response.ok) {
      const allEnvelopeIds = results.envelopes.map((envelope: any) => envelope.envelopeId)

      return NextResponse.json(
        {
          success: true,
          totalResultSetSize: results.resultSetSize,
          resultSetSize: results.resultSetSize,
          allEnvelopeIds: allEnvelopeIds,
          envelopes: results.envelopes,
          nextUri: results.nextUri,
          previousUri: results.previousUri,
        },
        { status: 200 },
      )
    } else {
      throw new Error("Failed to fetch envelopes")
    }
  } catch (error: any) {
    console.error("Error in fetching envelopes:", error)

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

