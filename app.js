const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.set("views", __dirname + "/public");

app.get("/", (req, res) => {
  res.render("partials/home");
});
app.get("/register", (req, res) => {
  res.render("partials/register");
});
app.get("/login", (req, res) => {
  res.render("partials/login");
});
app.listen(3000, () => {
  console.log("server started on port 3000");
});
