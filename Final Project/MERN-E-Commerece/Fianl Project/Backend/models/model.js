const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String, // if we want to add country code thats why type = string not number
    },
    address: {
      type: {},
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = new mongoose.model("Info", userSchema);
module.exports = userModel;
