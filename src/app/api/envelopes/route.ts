import { Envelope, ErrorResponse } from "@/types"
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
      const allEnvelopeIds = results.envelopes.map((envelope: Envelope) => envelope.envelopeId);

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
  } catch (error) {
    const err = error as ErrorResponse; // Specify the type of `error`
    console.error("Error in fetching all envelopes:", err);

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
