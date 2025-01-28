import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/docusign/debug`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const debugResult = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          ...debugResult,
        },
        { status: 200 },
      )
    } else {
      throw new Error("Authentication failed")
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      return NextResponse.json({ error: error.message, isAuthenticated: false, }, { status: 500 });
    }
    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', isAuthenticated: false, }, { status: 500 });
  }
}