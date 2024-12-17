// import path from 'path';
// import fs from 'fs';
// import docusign from 'docusign-esign';
// import { NextResponse } from 'next/server';

// // Helper function to check and refresh token
// async function checkToken(session: any) {
//   if (session.access_token && Date.now() < session.expires_at) {
//     console.log("re-using access_token ", session.access_token);
//     return session.access_token;
//   } else {
//     console.log("generating a new access token");
//     let dsApiClient = new docusign.ApiClient();
//     dsApiClient.setBasePath(process.env.BASE_PATH!);

//     const results = await dsApiClient.requestJWTUserToken(
//       process.env.INTEGRATION_KEY!,
//       process.env.USER_ID!,
//       "signature",
//       fs.readFileSync(path.join(process.cwd(), "private.key")),
//       3600
//     );

//     return {
//       access_token: results.body.access_token,
//       expires_at: Date.now() + (results.body.expires_in - 60) * 1000
//     };
//   }
// }

// // Helper function to create envelopes API
// function getEnvelopesApi(accessToken: string) {
//   let dsApiClient = new docusign.ApiClient();
//   dsApiClient.setBasePath(process.env.BASE_PATH!);
//   dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
//   return new docusign.EnvelopesApi(dsApiClient);
// }

// // Helper function to make envelope
// function makeEnvelope(name: string, email: string, company: string) {
//   let env = new docusign.EnvelopeDefinition();
//   env.templateId = process.env.TEMPLATE_ID!;

//   let text = docusign.Text.constructFromObject({
//     tabLabel: "company_name", 
//     value: company
//   });

//   let tabs = docusign.Tabs.constructFromObject({
//     textTabs: [text],
//   });

//   let signer1 = docusign.TemplateRole.constructFromObject({
//     email: email,
//     name: name,
//     tabs: tabs,
//     clientUserId: process.env.CLIENT_USER_ID!,
//     roleName: 'Applicant'
//   });

//   env.templateRoles = [signer1];
//   env.status = "sent";
//   return env;
// }

// // Helper function to make recipient view request
// function makeRecipientViewRequest(name: string, email: string) {
//   let viewRequest = new docusign.RecipientViewRequest();
//   viewRequest.returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/success`;
//   viewRequest.authenticationMethod = 'none';
//   viewRequest.email = email;
//   viewRequest.userName = name;
//   viewRequest.clientUserId = process.env.CLIENT_USER_ID!;
//   return viewRequest;
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, company } = body;

//     // Get or refresh access token
//     const tokenInfo = await checkToken({}); // Replace {} with actual session object
//     const accessToken = typeof tokenInfo === 'string' 
//       ? tokenInfo 
//       : tokenInfo.access_token;

//     // Create envelopes API
//     let envelopesApi = getEnvelopesApi(accessToken);

//     // Create envelope
//     let envelope = makeEnvelope(name, email, company);
//     let results = await envelopesApi.createEnvelope(
//       process.env.ACCOUNT_ID!, 
//       { envelopeDefinition: envelope }
//     );

//     // Create recipient view
//     let viewRequest = makeRecipientViewRequest(name, email);
//     results = await envelopesApi.createRecipientView(
//       process.env.ACCOUNT_ID!, 
//       results.envelopeId,
//       { recipientViewRequest: viewRequest }
//     );

//     return NextResponse.json({ redirectUrl: results.url });
//   } catch (error: any) {
//     console.error('DocuSign API Error:', error);
//     return NextResponse.json({ error: 'Failed to create DocuSign envelope' }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: 'This endpoint supports POST requests to interact with DocuSign.' });
// }
