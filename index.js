const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const app = express();
const PORT = 3000;
const { mongoUrl } = require("./keys");

require("./models/User");
const requireToken = require('./middleware/requireToken')
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(mongoUrl, {
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah");
});

mongoose.connection.on("error", (err) => {
  console.log("error mongo connection", err);
});

app.get('/', requireToken, (req, res) => {
  res.send("your email is " + req.user.email)
})

app.listen(PORT, () => {
  console.log("server running " + PORT);
});
