/* -------------------------------------------------------------------------- */
/*                               Cart Item Model                              */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const cartInfo = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    amount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartinfo", cartInfo);
