const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Restaurant Orders application. Manage orders easily."
  });
});

// listen for requests

const mongoose = require("mongoose");
const DB_URI = "mongodb://mongo:27017/ordersApp";

mongoose.connect(DB_URI).then(() => {
  app.listen(5000, () => {
    console.log("Server is listening on port 5000");
  });
});
