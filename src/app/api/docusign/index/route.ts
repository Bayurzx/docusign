import path from 'path';
import fs from 'fs';
import docusign from 'docusign-esign';
import { Tabs } from 'docusign-esign';

import { NextResponse } from 'next/server';

// Define an interface for token session to improve type safety
interface TokenSession {
  access_token?: string;
  expires_at?: number;
}

// Helper function to check and refresh token
async function checkToken(session: TokenSession = {}): Promise<string> {
  // Check if existing token is valid
  if (session.access_token && session.expires_at && Date.now() < session.expires_at) {
    console.log("Re-using existing access token");
    return session.access_token;
  }

  // Generate new token if no valid token exists
  console.log("Generating a new access token");
  const dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH!);

  try {
    const results = await dsApiClient.requestJWTUserToken(
      process.env.INTEGRATION_KEY!,
      process.env.USER_ID!,
      ["signature"],
      fs.readFileSync(path.join(process.cwd(), "private.key")),
      3600
    );

    return results.body.access_token;
  } catch (error) {
    console.error('Token generation failed:', error);
    throw new Error('Failed to generate access token');
  }
}

// Helper function to create envelopes API
function getEnvelopesApi(accessToken: string): docusign.EnvelopesApi {
  const dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH!);
  dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
  return new docusign.EnvelopesApi(dsApiClient);
}

// Helper function to make envelope
function makeEnvelope(name: string, email: string, company: string): docusign.EnvelopeDefinition {
  const env = new docusign.EnvelopeDefinition();
  env.templateId = process.env.TEMPLATE_ID!;

  const text = new docusign.Text();
  text.tabLabel = "company_name";
  text.value = company;

  const tabs = new docusign.Tabs();
  tabs.textTabs = [text];

  const signer1 = new docusign.TemplateRole();
  signer1.email = email;
  signer1.name = name;
  signer1.tabs = tabs;
  signer1.clientUserId = process.env.CLIENT_USER_ID!;
  signer1.roleName = 'Applicant';

  env.templateRoles = [signer1];
  env.status = "sent";
  return env;
}

// Helper function to make recipient view request
function makeRecipientViewRequest(name: string, email: string): docusign.RecipientViewRequest {
  const viewRequest = new docusign.RecipientViewRequest();
  viewRequest.returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/success`;
  viewRequest.authenticationMethod = 'none';
  viewRequest.email = email;
  viewRequest.userName = name;
  viewRequest.clientUserId = process.env.CLIENT_USER_ID!;
  return viewRequest;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company } = body;

    // Validate input
    if (!name || !email || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get access token
    const accessToken = await checkToken();

    // Create envelopes API
    const envelopesApi = getEnvelopesApi(accessToken);

    // Create envelope
    const envelope = makeEnvelope(name, email, company);
    const envelopeResult = await envelopesApi.createEnvelope(
      process.env.ACCOUNT_ID!, 
      { envelopeDefinition: envelope }
    );

    // Create recipient view
    const viewRequest = makeRecipientViewRequest(name, email);
    const viewResult = await envelopesApi.createRecipientView(
      process.env.ACCOUNT_ID!, 
      envelopeResult.envelopeId!,
      { recipientViewRequest: viewRequest }
    );

    return NextResponse.json({ redirectUrl: viewResult.url });
  } catch (error) {
    console.error('DocuSign API Error:', error);
    return NextResponse.json({ error: 'Failed to create DocuSign envelope' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint supports POST requests to interact with DocuSign.' });
}