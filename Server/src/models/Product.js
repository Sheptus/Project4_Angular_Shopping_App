const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pName: { type: String },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  price: { type: Number },
  imageURL: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
