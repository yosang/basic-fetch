const express = require("express");
const app = express();
const http = require("http").STATUS_CODES;

// Enabled json parsing on the server so we can post a json payload
app.use(express.json());

// Middleware that allows Cross Origin Resource Sharing across origins
// If we dont have a middleware, we basically have to repeat the process for every route
app.use((req, res, next) => {
  // Origins
  // res.setHeader('Access-Control-Allow-Origin', '*'); // Allows everyone to access resources on this server
// res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Allows a specific client only

  const allowedOrigins = ["http://127.0.0.1:5500"];
  const origin = req.headers.origin
  if(allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin',origin)

  //   Headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key"); // allows Content-Type and the x-api-key custom header to be used

  //  In Case of preflight OPTIONS requests, this allows headers for all routes (*)
  if (req.method === "OPTIONS") return res.status(200).end();

  next();
});

app.get("/", (_, res) => {
  res.status(200).json({ status: 200, message: http[200] });
});

// non-simple request
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.headers["x-api-key"]);
  res.status(201).json({ status: 201, message: http[201] });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
