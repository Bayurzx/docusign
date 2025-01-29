import { ErrorResponse } from "@/types";
import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(request: Request, { params }: { params: { envelopeId: string; documentId: string } }) {
  try {
    const { envelopeId, documentId } = params

    const response = await fetch(`${BASE_URL}/envelope/${envelopeId}/documents/${documentId}`, {
      method: "GET",
    })

    if (response.ok) {
      const result = await response.blob()
      const headers = response.headers
      const contentType = headers.get("Content-Type") || "application/octet-stream"
      const contentDisposition = headers.get("Content-Disposition") || "inline"

      return new NextResponse(result, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": contentDisposition,
        },
      })
    } else {
      throw new Error("Failed to fetch document")
    }
  } catch (error) {
    const err = error as ErrorResponse; // Specify the type of `error`
    console.error("Error in fetching document:", err);

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
