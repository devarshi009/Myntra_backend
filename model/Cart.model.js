const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  Brand: String,
  Image: String,
  Name: String,
  OlderPrice: Number,
  Price: Number,
  discount: String,

  id: Number,
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
