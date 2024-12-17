export async function GET() {
    return new Response(`Hello, World ${process.env.INTEGRATION_KEY}`, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
    });
}