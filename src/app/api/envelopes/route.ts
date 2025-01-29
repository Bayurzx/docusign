import { Envelope, ErrorResponse } from "@/types"
import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Fetch data at build time
const fetchEnvelopes = async () => {
  const response = await fetch(`${BASE_URL}/envelopes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch envelopes: ${response.statusText}`);
  }

  return response.json();
};

// Pre-render the data at build time
export async function GET() {
  try {
    const results: Envelope[] = await fetchEnvelopes();
    return NextResponse.json(results);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}