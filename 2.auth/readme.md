# About
### JWT
jsonwebtokens are tokens that are used for secure data exchange between client and a REST api server.
- Consists  of three parts:
    - Header (metadata, algorithm or type)
    - Payload (claims, or data like user ID's, roles)
    - Signature (signed by JWT, ensures integrity)
- Its Base64 encoded, separated by `.` and can be verified in jwt.io
- Can be used for authenticaiton and authorization.
- **Usage**: When a user logs in, the server creates a JWT, the client must include this token in every request.
    - Usually we send it in a header in the request `"Authorization": "Bearer long_token_asdasdasd"`.
- The server remains stateless (does not save data on users upon verification)

### API keys
API keys are simple strings/tokens that are used to identify and authenticate clients trying to access an API server.
- included in a request (query params, or header: `"x-api-key":"oaksdokasodaoskda"`)
- Used for access control or tracking usage of the api per key.
- Its easy to implement and lightweight.
- Does not have built-in-expiration like JWT, and is less secure (can be stolen)

### Headers
We can set our own custom header, just like `x-api-key` is a custom header. It is a good practice to start a custom header with `x-`, as there are forbidden headers we are not allow to use [forbidden headers](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header).