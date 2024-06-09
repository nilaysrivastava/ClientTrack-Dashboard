const express = require("express");
const router = express.Router();
const Customer = require("../models/customerSchema");

router.post("/createCustomer", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json({ success: true, customer: newCustomer });
  } catch (error) {
    console.error("Error creating customer:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
