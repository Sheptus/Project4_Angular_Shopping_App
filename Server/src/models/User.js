/* -------------------------------------------------------------------------- */
/*                                 User Model                                 */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    id: {
      type: Number,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 10,
    },

    password: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    street: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "member",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
