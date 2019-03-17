const express = require("express"),
  app = express(),
  logger = require("morgan"),
  config = require("./config/main"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require("cors");
const server = app.listen(config.port);
console.log("Server running on " + config.port);
const path = require("path");

mongoose.connect(config.database, { useNewUrlParser: true });
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build"));
});
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
//app.listen(3001, '192.168.0.3')
router(app); //<--- run router
