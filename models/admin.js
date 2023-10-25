const mongoose = require("mongoose");
const conn = require("../config/db");

let adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    addedBy: String,
  },
  {
    timestamps: true,
  }
);

let admin = conn.model("admin", adminSchema, "admin");
module.exports = admin;
