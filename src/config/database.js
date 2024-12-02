const mongoose = require("mongoose");
const { mongoURI } = require("./serverConfig");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
module.exports = connectDB;
