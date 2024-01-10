const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timeStamps: true }
);

const categoryModel = new mongoose.model("Category", categorySchema);
module.exports = categoryModel;
