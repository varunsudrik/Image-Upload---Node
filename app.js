import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { request } from "http";

let app = express();
let PORT = 4000;

//static file path
app.use(express.static(path.join(path.resolve() + "/public")));
//console.log(path.join(path.resolve() + "/public"));
app.set("view engine", "ejs");
app.set("views", "./public/views");

//middleware
app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/profile", (req, res) => {
  //   console.log(req.body);
  //   console.log(req.files);
  const imgFile = req.files.myImg;
  imgFile.mv(path.join(path.resolve() + "/public/images/" + imgFile.name)),
    res.render("display", {
      title: req.body.name,
      image: `${imgFile.name}`,
    });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
