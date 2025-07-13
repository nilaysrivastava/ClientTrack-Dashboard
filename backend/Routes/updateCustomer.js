const express = require("express");
const router = express.Router();
const Customer = require("../Models/customerSchema");

router.put("/updateCustomer/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
