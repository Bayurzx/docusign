import { NextResponse } from "next/server";
import { ErrorResponse } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/signing/responsive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const results = await response.json();

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          envelopeId: results.envelopeId,
          redirectUrl: results.redirectUrl,
          message: "Envelope created and ready for signing",
        },
        { status: 200 }
      );
    } else {
      console.error("Error in response:", results);
      return NextResponse.json(
        {
          success: false,
          errorCode: results.errorCode || "RESPONSE_ERROR",
          errorMessage: results.message || "An error occurred during the responsive signing process",
        },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    console.error("Error in responsive signing:", err);

    if (err.isAuthenticationError) {
      return NextResponse.json(
        {
          success: false,
          errorCode: err.details?.reason || "AUTHENTICATION_ERROR",
          errorMessage: err.message || "Authentication error",
          details: err.details,
        },
        { status: 401 }
      );
    }

    const status = err.response?.status || 500;
    const errorCode = err.response?.body?.errorCode || "UNKNOWN_ERROR";
    const errorMessage = err.response?.body?.message || err.message || "An unknown error occurred.";

    return NextResponse.json(
      {
        success: false,
        errorCode,
        errorMessage,
      },
      { status }
    );
  }
}
