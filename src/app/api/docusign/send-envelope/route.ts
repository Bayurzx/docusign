import { NextResponse } from 'next/server';
import docusign from 'docusign-esign';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipientName, recipientEmail, documentBase64, subject } = body;

    if (!recipientName || !recipientEmail || !documentBase64 || !subject) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(process.env.DOCUSIGN_BASE_URL!);
    apiClient.addDefaultHeader(
      'Authorization',
      `Bearer ${process.env.DOCUSIGN_SECRET}`
    );

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    const envelopeDefinition = {
      emailSubject: subject,
      recipients: {
        signers: [
          {
            email: recipientEmail,
            name: recipientName,
            recipientId: '1',
            routingOrder: '1',
          },
        ],
      },
      documents: [
        {
          documentBase64,
          name: 'Test Document',
          fileExtension: 'pdf',
          documentId: '1',
        },
      ],
      status: 'sent',
    };

    const results = await envelopesApi.createEnvelope(process.env.DOCUSIGN_ACCOUNT_ID!, { envelopeDefinition });
    return NextResponse.json(results);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
