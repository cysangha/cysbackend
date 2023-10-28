const mongoose = require("mongoose");
const conn = require("../config/db");

let fundraiserPaymentsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    transactionID: String,
    eventName: String,
    eventID: String,
    addedBy: String,
    paymentById: String,
    paymentByName: String,
    paymentByMobile: String,
    paymentByEmail: String,
    amount: Number,
    previousAmount: Number,
    currentAmount: Number,
  },
  {
    timestamps: true,
  }
);

let fundraiserPayments = conn.model(
  "fundraiserPayments",
  fundraiserPaymentsSchema,
  "fundraiserPayments"
);
module.exports = fundraiserPayments;
