const mongoose = require("mongoose");

// connect mongodb database
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    // eslint-disable-next-line no-console
    console.log(`Mongo DB Successfully Connected : ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};


module.exports = connectDB;
