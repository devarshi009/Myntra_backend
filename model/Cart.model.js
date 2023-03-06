const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  "Brand": String,
  "Image": String,
  "Name": String,
  "Price":Number,
  "discount": String,
    "OlderPrice": Number,
    "id":Number,
    "userId":String
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };