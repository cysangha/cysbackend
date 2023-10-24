const mongoose = require("mongoose");
const conn = require("../config/db");

let paymentsAdminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    paymentID: String,
    purchasedByID: String,
    purchasedByName: String,
    purchasedByAdminName: String,
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

let paymentsAdmin = conn.model(
  "paymentsAdmin",
  paymentsAdminSchema,
  "paymentsAdmin"
);
module.exports = paymentsAdmin;
