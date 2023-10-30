const mongoose = require("mongoose");
const conn = require("../config/db");

let fundraisersSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    addedByUsersName: String,
    addedByUsersEmail: String,
    addedBy: String,
    eventName: String,
    targetAmount: Number,
    minimumPay: Number,
  },
  {
    timestamps: true,
  }
);

let fundraisers = conn.model("fundraisers", fundraisersSchema, "fundraisers");
module.exports = fundraisers;
