const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.post("/orders", (req, res) => {
  const order = new Order({
    dishes: req.body.dish
  });
  order
    .save(order)
    .then(savedOrder => res.status(201).send(savedOrder))
    .catch(err => res.status(400).send(err));
});

app.get("/orders", (req, res) => {
  Order.find()
    .then(orders => res.status(200).send(orders))
    .catch(err => res.status(400).send(err));
});

app.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  Order.find({ _id: id })
    .then(orders => res.status(200).send(orders))
    .catch(err => res.status(400).send(err));
});

app.patch("/orders/:id", (req, res) => {
  const { id } = req.params;
  Order.findOneAndUpdate({ _id: id }, { served: true })
    .then(changedOrder => res.status(200).send(changedOrder))
    .catch(err => res.status(400).send(err));
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  Order.findByIdAndDelete({ _id: id })
    .then(deletedOrder => res.status(200).send(deletedOrder))
    .catch(err => res.status(400).send(err));
});

const mongoose = require("mongoose");
const Order = require("./models/order.js").Order;
const DB_URI = "mongodb://mongo:27017/ordersApp";

mongoose.connect(DB_URI).then(() => {
  console.log("APP IS RUNNING");
  app.listen(5000);
});
