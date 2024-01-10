const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const fs = require("fs");
var braintree = require("braintree");
const orderModel = require("../models/orderModel");
const dotenv = require("dotenv").config();
const util = require("util");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "f9nwzv2bcqd5ht8m",
  publicKey: "ptnt7wsj9x5pzkx8",
  privateKey: "9b77777b5219c09f4b5c42d670b2bdbf",
});

const createProductController = async (req, res) => {
  try {
    const { name, description, slug, category, price, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required",
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required",
        });
      case image && image.size > 500000:
        return res.status(500).send({
          error: "Image is Required & should be less than 5mb",
        });
    }
    // Create Products
    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.mimetype;
    }

    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      product: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-image")
      .populate("category")
      .limit(10)
      .sort(
        { createdAt: -1 }
        // .select(" __v: false ")
      );
    res.status(200).send({
      success: true,
      message: "All Products",
      Total_Products: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error: error.message,
    });
  }
};

// get Single Product
const getSingleProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    console.log(req.params);
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-image -__v"); // Assuming you want to exclude the 'image' and '__v' fields
    console.log(product);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error: error.message,
    });
  }
};

// Product Image
const productImageController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById({ _id: pid }).select("image");

    if (product && product.image && product.image.data) {
      res.set("content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Image not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error: error.message,
    });
  }
};

// product delete
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await productModel.findByIdAndDelete(id, {
      projection: { image: 0 },
    });

    if (!deleteProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found for deletion",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product has been deleted",
      deleteProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming you want to update fields like name, description, etc.
    const { name, description, category, price, quantity, shipping } =
      req.fields;

    const update = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        price,
        quantity,
        shipping,
        // Add other fields you want to update (slug)
      },
      { new: true }
    );

    if (!update) {
      return res.status(404).send({
        success: false,
        message: "Product not found for updating",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product has been updated",
      update,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

// Filters
const filterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {}; // Corrected variable name

    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) {
      // Corrected the typo here
      args.price = { $gte: radio[0], $lte: radio[1] }; // mongoose query
    }

    const Product = await productModel.find(args);

    res.status(200).send({
      success: true,
      Product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
    });
  }
};

const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// productListController
const productListController = async (req, res) => {
  try {
    const perPage = 30;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in listing page",
      error,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: new RegExp(keyword, "i") } },
          { description: { $regex: new RegExp(keyword, "i") } },
        ],
      })
      .select("-image");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search",
      error,
    });
  }
};

const relatedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in related products",
      error,
    });
  }
};

// Payment Gateway API

// token
const gatewayClientTokenGenerate = util.promisify(gateway.clientToken.generate);

const braintreeTokenController = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    const clientToken = response.clientToken;
    console.log("Generated clientToken:", clientToken);
    res.send({ clientToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Payment

// const gatewayTransactionSale = util.promisify(gateway.transaction.sale);
// // const orderModel = require("../models/orderModel"); // Ensure the correct path

// const braintreePayment = async (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;

// Calculate total amount from the cart
// cart.forEach((item) => {
//   total += item?.price;
// });

// Create a new transaction
//     const result = await gatewayTransactionSale({
//       amount: total,
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true,
//       },
//     });

//     if (result.success) {
//       // Save the order with the transaction details
//       const order = new orderModel({
//         products: cart,
//         payment: result,
//         buyer: req.user._id, // Assuming you have user authentication
//       });
//       await order.save();

//       // Respond with the order ID
//       res.json({ orderId: order._id });
//     } else {
//       res.status(500).send(result.message);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

// module.exports = braintreePaymentController;

const stripe = require("stripe")(
  "sk_test_51OKL3aSAycECGZuN6OW8u1mzuF2WjoUJ3smNQNyeAkoWHmsNIJpLLnDMbOSVQo3Lg965DonZiJaPDeVIAUmZsG0e00Zintpvkj"
);

const paymentMethod = async (req, res) => {
  res.send({ apiKey });
  if (apiKey) {
    console.log(apiKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } else
    res.status(400).json({
      message: "Invalid Api Key",
    });
};
const getAPI = async (req, res) => {
  console.log(stripeApiKey);
  res.status(200).json({
    stripeApiKey:
      "pk_test_51OKL3aSAycECGZuN4OACFsnIEfarWEBNzDFWystkAuc4Bw12ZA9loN6yRBDfs2kzNPV0mbbKVVFJ29tpa6hiiXxD00cKA3nO3k",
  });
};

module.exports = {
  createProductController,
  searchProductController,
  getProducts,
  getSingleProduct,
  filterController,
  productImageController,
  deleteProduct,
  updateProduct,
  productCount,
  productListController,
  relatedProduct,
  braintreeTokenController,
  // braintreePaymentController,
  // braintreePayment,
  paymentMethod,
  getAPI,
};
