const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  rate: Number,
  balance: Number,
  deposit: Number,
  currency: String,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
