const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.post("/orders", async (req, res) => {
  try {
    const order = await new Order({
      dishes: req.body.dish,
    }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(201).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find().exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.patch("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { served: true },
      { new: true }
    ).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.put("/orders", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete({ _id: id }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(204).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/test", async (req, res) => {
  const rp = require("request-promise");
  var options = {
    method: "GET",
    uri: "http://contacts:5000/contacts",
    json: true, // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

const mongoose = require("mongoose");
const Order = require("./models/order.js").Order;
const DB_URI = "mongodb://mongo:27017/ordersApp";

mongoose.connect(DB_URI).then(() => {
  console.log("APP IS RUNNING");
  app.listen(5000);
});
