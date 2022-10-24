const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { current_dir } = require("./util/config");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

//setting the parsers
app.use(express.json()); // application/json content parser
app.use(express.urlencoded({ extended: true })); // form-data content parser

app.use(express.static("public")); // expose of public folder as the accessible static folder

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(current_dir);
    cb(null, `${current_dir}/public/images/`);
  },
  filename: function (req, file, cb) {
    // const dishname = req.body.name.split("/").join("_");
    console.log(file.originalname);
    const imgname = file.originalname;
    cb(null, imgname);
  },
});

const uploads = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    console.log("file.originalname: " + file.originalname);
    const ext = path.extname(file.originalname);
    if (
      ext.toLowerCase() !== ".png" &&
      ext.toLowerCase() !== ".jpg" &&
      ext.toLowerCase() !== ".gif" &&
      ext.toLowerCase() !== ".jpeg"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

app.post(
  "/upload",
  (req, res, next) => {
    console.log("req received");
    next();
  },
  uploads.single("image"),
  (req, res, next) => {
    res.send({ url: `http://localhost:3004/images/${req.file.filename}` });
  }
);

app.use((err, req, res, next) => {
  res
    .status(500)
    .send(
      "<p>There's some error in the application, Kindly contact 8076603442<p>"
    );
});

app.listen(3004, () => {
  console.log(`server listening on port 3004`);
});
