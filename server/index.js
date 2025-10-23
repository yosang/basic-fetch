const app = require("express")();
const morgan = require("morgan");
const users = require("./users.json");
const cors = require("cors");
const http = require("http").STATUS_CODES;
const apiKey = "youshallnotpass";

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/users", (req, res) => {
  console.log(req.headers);
  res.json(users);
});

// Usage of API keys
app.get("/lotr", (req, res) => {
  
    // Check the headers, queryparams and cookies
  if (req.headers["x-api-key"] !== apiKey && req.query["x-api-key"] !== apiKey)
    return res.status(401).json({ status: http[401], message: http[401] });

  res.status(200).json({ status: 200, message: "Welcome to the kingdom" });
});

app.listen(3000, () => console.log("app is started"));
