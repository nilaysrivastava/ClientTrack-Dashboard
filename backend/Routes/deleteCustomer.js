const express = require("express");
const router = express.Router();
const Customer = require("../Models/customerSchema");

router.delete("/deleteCustomer/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
