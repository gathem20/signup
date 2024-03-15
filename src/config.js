const mongose = require("mongoose");
const connect = mongose.connect("mongodb://localhost:27017/login-tut");

connect
  .then(() => {
    console.log("database is connencted");
  })
  .catch(() => {
    console.log("database filled connection");
  });

const schema_web = new mongose.Schema({
  FirstName: {
    type: String,
    requierd: true,
  },
  LastName: {
    type: String,
    requierd: true,
  },
  email: {
    type: String,
    requierd: true,
  },
  date: {
    type: String,
    requierd: true,
  },
  gender: {
    type: String,
    requierd: true,
  },
  username: {
    type: String,
    requierd: true,
  },
  phone: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    requierd: true,
  },
});
const collection = new mongose.model("users", schema_web);

module.exports = collection;
