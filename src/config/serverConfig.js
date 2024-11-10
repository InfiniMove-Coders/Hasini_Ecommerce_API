const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  mongoURI: process.env.mongoURI,
  JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
};
