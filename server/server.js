var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/files' }).single("file")
var uploadImage = multer({ dest: 'uploads/images/' }).single("image")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const imageLink = "https://cdn0.froala.com/assets/editor/pages/v3/editor-photo-0c6048e9ae73fe1da41b5e805324e919.png";

app.use((req, res, next)=> {
	console.log(req.body);
	next();
})
	
app.post("/delete",function (req,res) {
  res.json({
    message: "Image deleted",
    detail: "This is a sample response"
  });
});
app.post('/upload/file', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    res.json({ "link": `http://localhost:7000/${req.file.path}` });
  })
})
app.post('/upload/image', function (req, res) {
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.log(err);
      // An unknown error occurred when uploading.
    }
    res.json({ "link": `http://localhost:7000/${req.file.path}` });
  })
})
app.get("/images",function (req,res) {
  res.json([1,2,3,4,5].map((c) => {
    return {
      "url": imageLink,
      "thumb": imageLink,
      "tag": "sport"
    }
  }));
});

app.listen(7000,function () {
  console.log("Running on port 7000")
})