import { NextResponse } from 'next/server';
import { authenticate } from '@/services/authService';

export async function GET() {
    try {
        const data = await authenticate();
        return NextResponse.json(data, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.error('Unknown error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
