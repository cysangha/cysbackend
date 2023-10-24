const mongoose = require("mongoose");
const conn = require("../config/db");

let memberSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    member_name: String,
    father_name: String,
    access: String,
    member_id: String,
    type: String,
    date: String,
    membershipPurchaseDate: String,
    membershipPeriod: Number,
    membershipPeriodBeng: String,
    pricePaid: Number,
    mobile: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

let members = conn.model("members", memberSchema, "members");
module.exports = members;
