const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Index = require("./Routes/index");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server started at Port number ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log("req.body", req.body);
//   console.log("file", req.file);
// });

app.use("/api", Index);
