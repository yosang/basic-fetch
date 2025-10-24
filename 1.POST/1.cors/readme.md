# CORS - Cross Origin Resource Sharing
Its a policy set by browsers that exist to protect users when sharing resources from one domain to another.

This policy prevents malicious websites from making unauthorized requests to another domain on behalf of a user.

## Origins
An origin is defined by protocols (HTTP or HTTPS), domains (example.com) and port (:80 or :3000).

- http://example.com and https://example.com are different origins.
- http://example.com:8080 and http://example.com:5500 are also different origins.

Just by the fact that we are attempting to reach a resource to a different origin, CORS will be triggerd, therefore the server must include `Access-Control-Allow-Origin` header in the response allowing us to access that resource.

## Requests
- For simple requests using GET, POST, or HEAD (HEAD method is similar to GET but returns only the HTTP headers in the response received from a server, it will not contain a body) - [link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/HEAD) methods with certain safe headers, the browser sends the request directly but checks the server’s response for CORS headers.
- For non-simple requests (e.g., PUT, DELETE, or requests with custom headers), the browser first sends a `preflight` request (an OPTIONS request) to check if the server allows the actual request.

This means that if the request being sent is not safe, we must identify our request with a `Origin` header, this happens by default when a cross-origin request is made so its not something we need to manually put in ("Origin": http://127.0.0.1:5500.com) when we are running Live Server on vscode.

- The server must respond with an `Access-Control-Allow-Origin` header to indicate which origins are allowed to access its resources.
    - `Access-Control-Allow-Origin: *` means any origin is allowed (common for public APIs).
    - `Access-Control-Allow-Origin: http://mywebsite.com` allows only http://mywebsite.com to access the resource.

If the server doesn’t include this header or doesn’t allow the requesting origin, the browser blocks the response from being accessed by the client.

# Simple vs. Non-Simple Requests

## Simple Requests
- Uses `GET`, `POST`, or `HEAD` methods.
- Uses only specific headers (`Accept`, `Content-Type` with values like `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`).
- These don’t trigger a `preflight` request, but the server still needs to include Access-Control-Allow-Origin in the response.


## Non-Simple Requests
- Uses methods like `PUT`, `DELETE`, or custom headers (`X-Custom-Header`).
- The browser sends a `preflight` OPTIONS request to check if the server allows the request. The server must respond with appropriate CORS headers (`Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`).

# Preflight
For non-simple requests, the browser sends an `OPTIONS` request before the actual request to ask the server if it’s okay to proceed.

The server responds with headers like:

- `Access-Control-Allow-Origin:` Specifies allowed origins.
- `Access-Control-Allow-Methods:` Lists allowed HTTP methods (e.g., GET, POST, PUT).
- `Access-Control-Allow-Headers:` Lists allowed headers (e.g., Content-Type, Authorization).

If the preflight response is valid, the browser sends the actual request.

# OPTIONS
When theres a CORS validation about to happen, the browser first sends a request with an `OPTIONS` method, this is part of the `preflight` request.

Its just a request with a specific method called `OPTIONS`, specifically designed for CORS, and it includes:
- `Origin` - The origin from where the request is coming from, it must be allowed on the server.
- `Access-Control-Request-Headers` - The headers that this request is asking to use, such as `Content-Type`, `x-api-key` etc
- `Access-Control-Request-Method` - The method that this request is asking to use, it can be a `POST`, `PUT` or whatever.

On the server-side, the browser expects these `Access-Control-Request-XX` to match with a `Access-Control-Allow-XX`.

We also have to send back a response to the `OPTIONS` method with a `200`. (Seems to not be mandatory for all browsers, some browser will allow only the `Acess-Control-Allow-XX`... to be set and `OPTIONS` will pass)

To allow them the `Access-Control-Request-XX`'s , we either use a middleware, `cors` for express, or design one of our own.

```js
app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*'); // Allows everyone to access resources on this server
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Allows a specific client only
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key"); // allows Content-Type and the x-api-key custom header to be used
  
  //  In Case of preflight OPTIONS requests, this allows headers for all routes (*)
  if(req.method === 'OPTIONS')
    return res.status(200).end();

  next();
});
```

# Modes
We can specify certain modes for our request that defines how CORS should behave. These will not override CORS in any way, instead they just put a flag on the request to avoid being notified about CORS.

- `no-cors` - Sends cross-origin requests without preflight, but the response is opaque (can’t access body or most headers). Only simple requests (GET, POST, HEAD with safe headers) are allowed.
- `cors` - Default for fetch. Enforces CORS rules, requiring server headers like Access-Control-Allow-Origin. Simple requests go directly; non-simple ones trigger a preflight OPTIONS request.
- `same-origin` - Restricts requests to the same origin (protocol, domain, port). Cross-origin requests are blocked entirely.
- `navigate` - Used by browsers for navigation (e.g., links, forms). Not settable in JavaScript.

# Opaque responses
When using `no-cors`, we get a response that is of type `opaque`, which means we dont get access to the body, the resource itself and also most headers. This can be used for say performance, lets say we want to fetch `https://picsum.photos` to pre-load the images but not access the images itself, we can do that with `no-cors`. Why? for caching purposes maybe and improve loading, next time we fetch from the same place, this time with CORS enabled, the images will load faster because they are already cached.
