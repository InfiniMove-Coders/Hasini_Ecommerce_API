const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");
const connectDB = require("./config/database");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
  connectDB();
});
