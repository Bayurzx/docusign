import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type ErrorResponse = {
  response?: {
    status?: number;
    body?: {
      errorCode?: string;
      message?: string;
    };
  };
  isAuthenticationError?: boolean;
  details?: {
    reason?: string;
  };
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/signing/embedded`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        {
          success: true,
          envelopeId: data.envelopeId,
          redirectUrl: data.redirectUrl,
          message: "Envelope created and ready for signing",
        },
        { status: 200 }
      );
    } else {
      console.error("Error in response:", data);
      return NextResponse.json(
        {
          success: false,
          errorCode: data.errorCode || "RESPONSE_ERROR",
          errorMessage: data.message || "An error occurred during the embedded signing process",
        },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    console.error("Error in embedded signing:", err);

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
