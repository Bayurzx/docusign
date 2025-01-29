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


# Thursday, January 9, 2025 12:18:49 PM
### 
-  Started work on how to run the algorithm for this process and return back your LLM edited html string
-  

# Wednesday, January 22, 2025 10:46:21 PM
- Value for req.session

```log
Session {
  cookie: {
    path: '/',
    _expires: 2025-01-23T20:50:57.409Z,
    originalMaxAge: 86400000,
    httpOnly: true,
    secure: false
  },
  auth: {
    accountId: 'ca9a3a4e-999b-46c8-80fd-98fa8317c198',
    accountName: 'IGLUM Nig. Ltd.',
    basePath: 'https://demo.docusign.net/restapi',
    accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAe4R5JjvdSAgAgONI2y473UgCABdYBZKC7elMgfMs9W2JnYwVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADYwYTAxYTc3LTRhOTUtNDM0MS1hNDYyLWQ3ZGE0ZWRlMjU4ZCIAJAAAADYwYTAxYTc3LTRhOTUtNDM0MS1hNDYyLWQ3ZGE0ZWRlMjU4ZBIAAQAAAAYAAABqd3RfYnIjACQAAAA2MGEwMWE3Ny00YTk1LTQzNDEtYTQ2Mi1kN2RhNGVkZTI1OGQ.KzgjhJcsQ_5f7iGVOBgtfnOBKvreNICLPmJnaZw-MSi4WOjw9eLzxujthWXLxGn50S5l35xNdAgv5dMI57zCjgORp9_Isfk5jTd6dgu5qtN64pzvNVVBYkVcFV2FsZGiJ_c1bjyedm9YOZAXdZp7-hCjukHS9WWPjKcGIzw7vtN5iJyaXlpIV0Bci3v77IwxAcN3Efb75AbIORW_JBSTQPuur9narBA9dejWQKaLbsaK4YDa7WbRD2oWaleKHJAjxnYKlVHVL-uXvI6nTvOC5WnMhZPB457XrO9A_8bp-1mTkBXbX1JfCVBqhg4RMR4s5dD_14zu-aCzPGTQse85rA',
    tokenExpirationTimestamp: Moment<2025-01-22T22:41:00+01:00>
  }
}
```

## Login and logout
- Set up login with route
  - modified:   src/app/api/docusign/auth/route.ts
  - deleted:    src/app/api/docusign/index/route.ts
  - modified:   src/app/api/docusign/logout/route.ts


## Deploy to Azure
az webapp up --name docu-be --resource-group docusign --plan ASP-docusign-9792 --sku B1 --location eastus

az webapp show --name docu-be --resource-group docusign


//group1
confidentiality-agreement
consulting-agreement
copyright-assignment-agreement
independent-contractor-agreement
intellectual-property-agreement
licensing-agreement
non-disclosure-agreement
promissory-note-agreement
release-of-liability-agreement
room-rental-agreement
subscription-agreement
supply-agreement

// group2
Confidentiality Agreement.html
Consulting Agreement.html
Copyright Assignment Agreement.html
Independent Contractor Agreement.html
Intellectual Property Agreement.html
Licensing Agreement.html
Non-Disclosure Agreement.html
Promissory Note Agreement.html
Release of Liability Agreement.html
Room Rental Agreement.html
Subscription Agreement.html
Supply Agreement.html



## Supply Agreement
- Updated handleSubmit(s) onClick for the three endpoints @ `src\components\supply-agreement\review-step.tsx:23,34`
  - Also update the Button name.
- Also update the `formData` in `src\app\supply-agreement\page.tsx:73,3` to speed up development process
- Commented out `ContractStep` and `CCStep` at page (import and const steps)
- Added isLoading functionality
  - disabled click when loading is true
  - setIsLoading on the start of final submission and false when it's finally done
- updating formData in finalSubmit to avoid missing input at backend
  - contractName
  - Added LoadingSpinner which shows when loading is true
- Removed and re-imported `FormDataSupplyAgreement, FormValueSupplyAgreement` types
  - Rename FormData to FormDataSupplyAgreement
- Will have the following as the only constant formData: `signer1Email, signer1Name, signer2Email, signer2Name` and `contractName`
  - `contractName` will be derived from a mapping function using the route info as input check Line `src\app\supply-agreement\page.tsx:125,7`
- Fixed updateFormData function typing error
  - Each FormValue should have it's own typing : `FormValueSupplyAgreement`
- Added `<LoadingSpinner show={isLoading} />` to DOM

### Bonus
- Was able to create clones like whatsapp etc.