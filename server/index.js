const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const router = require("./router/crud.js");
const mongoose = require("mongoose");
// constants
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/crud", { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
  });

// middleware
// app.use (bodyParser.json ());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// storage engine for multer

app.use("/app", router);

const storageEngine = multer.diskStorage({
  // destination: './public/uploads/',
  destination: function (req, file, callback) {
    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }
    let location;
    if (/jpg|png|svg|jpeg/.test(path.extname(file.originalname))) {
      if (!fs.existsSync("./public/images")) {
        fs.mkdirSync("./public/images");
      }
      location = "./public/images";
    } else if (/mp4/.test(path.extname(file.originalname))) {
      if (!fs.existsSync("./public/videos")) {
        fs.mkdirSync("./public/videos");
      }
      location = "./public/videos";
    } else if (/pdf/.test(path.extname(file.originalname))) {
      if (!fs.existsSync("./public/pdf")) {
        fs.mkdirSync("./public/pdf");
      }
      location = "./public/pdf";
    }
    callback(null, location);
  },
  //   destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /jpg|png|svg|jpeg|mp4|pdf/; // reqex

  if (pattern.test(path.extname(file.originalname))) {
    callback(null, true);
  } else {
    callback("Error: not a valid file");
  }
};

// initialize multer
const upload = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.send("hiii");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    //If the file is not uploaded, then throw custom error with message: FILE_MISSING
    throw Error("FILE_MISSING");
  } else {
    //If the file is uploaded, then send a success response.
    res.send({ status: "success" });
  }
});

app.listen(8080, () => {
  console.log("connected");
});
