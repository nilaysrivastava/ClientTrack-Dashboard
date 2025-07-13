// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const mongoDB = require("./db");
mongoDB();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api", require("./Routes/createCustomer"));
app.use("/api", require("./Routes/displayCustomers"));
app.use("/api", require("./Routes/deleteCustomer"));
app.use("/api", require("./Routes/updateCustomer"));

app.listen(port, () => {
  console.log(`clientTrack app is listening on port ${port}`);
});
