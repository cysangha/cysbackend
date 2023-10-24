const mongoose = require("mongoose");
const conn = require("../config/db");

let paymentsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    paymentID: String,
    purchasedByID: String,
    purchasedByName: String,
    purchasedByMobile: String,
    purchasedByEmail: String,
    type: String,
    date: String,
    membershipPeriod: Number,
    membershipPeriodBeng: String,
    pricePaid: Number,
  },
  {
    timestamps: true,
  }
);

let payments = conn.model("payments", paymentsSchema, "payments");
module.exports = payments;
