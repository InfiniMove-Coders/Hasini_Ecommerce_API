const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");
const connectDB = require("./config/database");
const apiRoutes=require("./routes/index");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
  connectDB();
});
 