import { NextResponse } from "next/server"
import { ErrorResponse, EnvelopeDocument } from "@/types"

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
      const documentIdList = result.envelopeDocuments.map((doc: EnvelopeDocument) => doc.documentId)

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
  } catch (error) {
    const err = error as ErrorResponse; // Specify the type of `error`
    console.error("Error in fetching envelope documents:", err);

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
