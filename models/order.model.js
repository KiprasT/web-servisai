const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  dishes: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
