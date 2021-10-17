const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  price: { type: Number },
  city: { type: String },
  street: { type: String },
  dateOfOrder: { type: String },
  dateOfPurchase: { type: String, default: Date.now() },
  card: { type: String },
});

module.exports = mongoose.model("order", orderSchema);
