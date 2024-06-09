const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://nilay:hellotable@cluster0.k5dt17c.mongodb.net/datatable?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const customer = mongoose.connection.db.collection("customers");
    const sampleData = await customer.find({}).toArray();

    global.customers = sampleData;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
