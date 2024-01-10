const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    slug:{
        type: String,
        required: true,
        lowercase: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: false,
      },
    quantity:{
        type: Number,
        required: true
    },
    image:{
        data: Buffer,        // data: Buffer
        contentType: String
    },
    shipping:{
        type: Boolean,
    }
},{timestamps: true})

const productModel = new mongoose.model("Product",productSchema)

module.exports = productModel