import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/docusign/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const authResult = await response.json()

    if (response.ok) {
      return NextResponse.json(
        {
          message: "Authentication successful",
          ...authResult,
        },
        { status: 200 },
      )
    } else {
      throw new Error("Authentication failed")
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}