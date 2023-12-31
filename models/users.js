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
    access: String,
    memberID: String,
    date: String,
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

let users = conn.model("userMembers", userSchema, "userMembers");
module.exports = users;
