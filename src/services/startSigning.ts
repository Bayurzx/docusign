// src\services\startSigning.ts
const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';


type StartSigningData = {
    signerEmail: string;
    signerName: string;
    signerClientId: string;
};

export const startSigning = async (signingData: StartSigningData) => {
    const url = (endpoint: string) => `${baseUrl}${endpoint}`;

    try {
        // Send a POST request to the server with dynamic data for signing
        const response = await fetch(url('/signing/start'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signerEmail: signingData.signerEmail,
                signerName: signingData.signerName,
                signerClientId: signingData.signerClientId,
            })
        });

        const data = await response.json();
        if (data.success) {
            // Redirect to DocuSign if successful
            window.location.href = data.redirectUrl;
        } else {
            console.error('Failed to start signing:', data.errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
