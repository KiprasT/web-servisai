const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  dishes: { type: String, required: true },
  served: { type: Boolean, default: false },
  user: { type: Number, required: false, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
