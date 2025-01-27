import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(request: Request, { params }: { params: { envelopeId: string } }) {
  try {
    const { envelopeId } = params

    const response = await fetch(`${BASE_URL}/envelope/${envelopeId}/documents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (response.ok) {
      const documentIdList = result.envelopeDocuments.map((doc: any) => doc.documentId)

      return NextResponse.json(
        {
          success: true,
          envelopeId: envelopeId,
          documents: result.envelopeDocuments,
          documentIdList: documentIdList,
          standardDocuments: [
            { name: "Combined", type: "content", documentId: "combined" },
            { name: "Zip archive", type: "zip", documentId: "archive" },
            { name: "PDF Portfolio", type: "portfolio", documentId: "portfolio" },
          ],
        },
        { status: 200 },
      )
    } else {
      throw new Error("Failed to fetch envelope documents")
    }
  } catch (error: any) {
    console.error("Error in fetching envelope documents:", error)

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

