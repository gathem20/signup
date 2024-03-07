const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("login");
// });
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.use(express.static("public"));

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    name2: req.body.name2,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    date: req.body.date,
    username: req.body.username,
    phone: req.body.phone,
  };
  const extUser = await collection.findOne({
    username: data.username,
    email: data.email,
  });
  if (extUser) {
    res.send(
      "User already exists. Please choose a different username and email."
    );
  } else {
    const saltrounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltrounds);
    data.password = hashPassword;

    const userData = await collection.insertMany(data);
    console.log(userData);
    res.redirect("/");
  }
});

//login
// app.post("/login", async (req, res) => {
//   try {
//     const check = await collection.findOne({
//       username: req.body.username,
//     });
//     if (!check) {
//       res.send("cannot found user");
//     }
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );
//     if (isPasswordMatch) {
//       res.render("home");
//     } else {
//       req.send("wrong password or email..!");
//     }
//     console.log(check);
//   } catch {
//     console.log(error);
//     res.send("wrong detials");
//   }
// });
const port = 3626;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
