const mongoose = require("mongoose");
const conn = require("../config/db");

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    membersID: String, //Added For Firebase
    id: String, //Added For Firebase
    name: String,
    mobile: String,
    photoName: String,
    url: String,
    password: {
      type: String,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

let users = conn.model("userteacher", userSchema, "userteacher");
module.exports = users;
