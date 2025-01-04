# Initialization on Monday, December 9, 2024 4:43:23 PM

- I created `INTEGRATION_KEY`,  `RSA_KEYPAIR_ID`, and docusign private and public key
- Remember to update cors rules and get and post methods


## [DocuSign eSignature Quickstart with Node.js](https://www.youtube.com/watch?v=sqx8KbVa6Cw)
- https://developers.docusign.com/docs/esign-rest-api/sdks/node/
### *Setup and Configuration* you install docusign and dep

### Authentication: (requestJWTUserToken)
- JSON Web Tokens (JWT) with Node.js 
  - Need to save the token and use it in client while making requests
    - Two types App and User. User works for video
  - Configuration information required to proceed with JWT
    - [Api and Keys](https://admindemo.docusign.com/authenticate?goTo=appsAndKeys&_gl=1*1sna41g*_gcl_au*MTY0ODkyMzQxOC4xNzMzNTc1NTQz)
      - Integration key (client ID): `dsConfig.dsClientId`
      - RSA private key: `rsaKey`
      - Base path (https://demo.docusign.net/restapi)
      - Impersonated User ID (UserID): `dsConfig.impersonatedUserGuid`
      - scopes: [Authentication scopes](https://developers.docusign.com/platform/auth/reference/scopes/)
        - We are looking at `signature` scope name: `scopes: signature,`
    ``` js
    const results = await dsApi.requestJWTUserToken(dsConfig.dsClientId, dsConfig.impersonatedUserGuid, this.scopes, rsaKey, jwtLifeSec);

    const results = await dsApiClient.requestJWTUserToken(
        process.env.INTEGRATION_KEY!,
        process.env.USER_ID!,
        "signature",
        fs.readFileSync(path.join(process.cwd(), "private.key")),
        3600
    );

    ```

### Instantiating and configuring the ApiClient for making API calls

```js
The basic flow of instantiating an ApiClient looks like this:

    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(args.basePath);
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
    let envelopesApi = new docusign.EnvelopesApi(dsApiClient);

```

## Wednesday, January 1, 2025 9:06:11 AM
### [Build a fullstack app in 7 minutes with v0 (Figma to code)](https://www.youtube.com/watch?v=cyFVtaLy-bA)
- Paste figma link directly
- Codebase to copy code
- v0 can now build fullstack apps and [connect to databases](https://youtu.be/cyFVtaLy-bA?t=267)


## Thursday, January 2, 2025 10:24:25 PM
### Popular ways to generate PDFs programmatically
- pdf-lib:
  - A lightweight library to create and manipulate PDF documents

- Puppeteer (for generating PDFs from HTML):
  - If you need to create PDFs from HTML content (such as reports or web pages), Puppeteer can capture and render HTML into PDF format.
- HTML-to-PDF:
  - wkhtmltopdf:
    - A command-line tool that converts HTML pages into PDF using the Webkit rendering engine. It's often used in conjunction with scripts or web frameworks.
### Flexible strategy for generating the PDF.
- HTML-to-PDF Approach
  - One of the best strategies for handling dynamically generated content is to render the content as HTML first and then convert it to a PDF. 

### How to implement this:
- First, generate the content as HTML (for example, from user input or a database).
- Use a tool/library to convert the HTML to a PDF.
- Libraries/Tools:
  - Puppeteer (Node.js): You can create a headless browser instance, render the HTML, and generate the PDF.

### Leverage Markdown (if possible)
Markdown as an intermediate format. Markdown allows you to write content that can be easily converted into styled HTML and then turned into a PDF.

#### How to implement this:
- Allow users or systems to input content in Markdown format.
- Convert the Markdown into HTML and then render it to PDF.

#### Libraries/Tools:
- Markdown (Python): markdown library to convert markdown text to HTML.
- Marked (Node.js): A popular Markdown parser.
- Puppeteer or wkhtmltopdf to convert HTML to PDF.



### Bonus
- Was able to create clones like whatsapp etc.