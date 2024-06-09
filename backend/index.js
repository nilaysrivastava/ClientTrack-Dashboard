const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoDB = require("./db");
mongoDB();

app.use(
  cors({
    origin: "http://localhost:3000",
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
  console.log(`FoodE app is listening on port ${port}`);
});
