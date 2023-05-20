const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/secrets");
const trySchema = new mongoose.Schema({
  email: String,
  password: String,
});
const secretkey = "mynameisnainakansal";
trySchema.plugin(encrypt, { secret: secretkey, encryptedFields: ["password"] });
const item = mongoose.model("second", trySchema);

app.get("/", (req, res) => {
  res.render("partials/home");
});

app.post("/register", (req, res) => {
  const newUser = new item({
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save();
  res.render("partials/secrets");
});

app.get("/register", (req, res) => {
  res.render("partials/register");
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.email;
    const password = req.body.password;
    const foundUser = await item.findOne({ email: username });
    console.log(foundUser);
    if (foundUser) {
      if (foundUser.password === password) res.render("partials/secrets");
      else res.send("possword is incorrect");
    } else res.send("user does not exist!!");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("partials/login");
});
app.listen(3000, () => {
  console.log("server started on port 3000");
});
