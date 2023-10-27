const mongoose = require("mongoose");
const conn = require("../config/db");

let donationsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    paymentID: String,
    donatedByID: String,
    donatedByName: String,
    donatedByMobile: String,
    donatedByEmail: String,
    type: String,
    date: String,
    donationAmount: Number,
  },
  {
    timestamps: true,
  }
);

let donations = conn.model("donations", donationsSchema, "donations");
module.exports = donations;
