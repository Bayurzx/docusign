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
    - 