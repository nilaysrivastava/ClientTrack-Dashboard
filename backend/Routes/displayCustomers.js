const express = require("express");
const router = express.Router();
const Customer = require("../models/customerSchema");

router.get("/displayCustomers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
