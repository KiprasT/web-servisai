const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: String,
  cost: Number
});

const Dish = mongoose.model("Dish", DishSchema);

module.exports = { Dish };
