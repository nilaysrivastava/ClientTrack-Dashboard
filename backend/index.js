require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const mongoDB = require("./db");

mongoDB();

// --- START OF CHANGES ---

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

// This new log will show us EXACTLY what URL is being used by the server.
console.log(
  `CORS requests will be allowed from the following origin: ${allowedOrigin}`
);

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// --- END OF CHANGES ---

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
