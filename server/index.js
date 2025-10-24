const app = require("express")();
const morgan = require("morgan");
const users = require("./users.json");
const cors = require("cors");
const multer = require('multer'); // docs https://expressjs.com/en/resources/middleware/multer.html

const http = require("http").STATUS_CODES;
const apiKey = "youshallnotpass";

const upload = multer({ dest: "uploads/" });

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

// Client receives a list of users
app.get("/users", (req, res) => {
  console.log(req.headers);
  res.json(users);
});

// API keys example
app.get("/lotr", (req, res) => {
  // Check the headers, queryparams and cookies
  if (req.headers["x-api-key"] !== apiKey && req.query["x-api-key"] !== apiKey)
    return res.status(401).json({ status: 401, message: http[401] });

  res.status(200).json({ status: 200, message: "Welcome to the kingdom" });
});

// Upload example using multipart/form-data
const uploadMiddleware = upload.fields([
    { name: 'jsonfile', maxCount: 1 },
    { name: 'imagefile', maxCount: 1 },
]);

app.post("/upload", uploadMiddleware, (req, res) => {
  const files = req.files;

  if(!files || !files.jsonfile || !files.imagefile) return res.status(400).json({status:400, message: http[400]});

  console.log('Uploaded files: ',files)
  
  res.status(201).json({ status: 201, message: http[201] });
  }
);



app.listen(3000, () => console.log("app is started"));
