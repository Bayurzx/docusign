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
  } catch (error: any) {
    console.error("Error in fetching document:", error)

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

