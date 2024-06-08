const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const { mongoUrl } = require("./keys");

const initWebRoutes = require("./routes/web");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
// app.use(initWebRoutes);
initWebRoutes(app);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connection to database");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
