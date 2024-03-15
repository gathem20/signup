//
const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");
const collaction = require("./config");

const app = express();

// convert data into json format تحويل البيانات إلى تنسيق json
app.use(express.json()); //هذا السطر يستخدم middleware من Express.js للمساعدة في تحليل
app.use(express.urlencoded({ extended: false }));

//static file css
app.use(express.static("public"));

//API
// register user
//----signup--------
try {
  app.post("/signup", async (req, res) => {
    const data = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      BirthDay: req.body.date,
      username: req.body.username,
      phone: req.body.phone,
    };
    const extUser = await collaction.findOne({
      username: data.username,
      email: data.email,
    });
    if (extUser) {
      res.status(400).send({
        message:
          "User already exists. Please choose a different username and email.",
      });
    } else {
      const saltrounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltrounds);
      data.password = hashPassword;

      const userData = await collaction.insertMany(data);
      console.log(userData);
      // res.render("login")
    }
  });
} catch (err) {
  res.status(500).send({ error: err });
}

// ---------------------------------------------------------
//--login---
//login user
app.post("/login", async (req, res) => {
  try {
    const check = await collaction.findOne({ name: req.body.username });
    if (!check) {
      res.send("wrong Email");
    } else {
      //compare the hash password from the database with the plain taxt
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (isPasswordMatch) {
        // res.render('home')
      } else {
        res.send("wrong Email");
      }
    }
  } catch {
    res.send("wrong Email erro");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`server run port on ${port}`);
});
