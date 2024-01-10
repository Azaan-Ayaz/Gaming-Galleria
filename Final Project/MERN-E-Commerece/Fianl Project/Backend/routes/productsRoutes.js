const express = require("express");
const stripe = require("stripe")(
  "sk_test_51OKLBeSIsiY4AVCkNMTathVDNyQd7aBMAfaBMKrCBG3MVOQJYj2RNRWgUF7TZvqoohMzKOV3wgQQPVxewt33q6l900too4GpUY"
);
const formidableMiddleware = require("express-formidable");
const { requireSignIn, isAdmin } = require("../middleware/middleware");
const {
  createProductController,
  getProducts,
  getSingleProduct,
  productImageController,
  deleteProduct,
  updateProduct,
  filterController,
  productCount,
  productListController,
  searchProductController,
  relatedProduct,
  paymentMethod,
  getAPI,
} = require("../controller/productController");

const router = express.Router();

// router.use(express.json());
// router.use(formidableMiddleware());

// Define routes
router.post("/create-product", createProductController);
router.get("/get-product", getProducts);
router.get("/get-product/:slug", getSingleProduct);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", updateProduct);

// filter product
router.post("/product-filter", filterController);

// get Photo
router.get("/product-image/:pid", productImageController);

// product count
router.get("/product-count", productCount);

// product per page
router.get("/product-list/:page", productListController);

// search Product
router.get("/search/:keyword", searchProductController);

// Corrected route definition
router.get("/related-product/:pid/:cid", relatedProduct);

// Payments Route
router.get("/publishable-key", (req, res) => {
  res.send({
    publishable_key:
      "pk_test_51OKLBeSIsiY4AVCk6uYykDnlwr2Bj0YCdLZGztqmOSswcrMk9yWybT0naM4gJNhllbHmPD3ZvQF960eM9LXqZTLI00EW8rLwTi",
  });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { price, email, name } = req.body;
    let customer = await stripe.customers.list({
      email: "Azaan@gmail.com",
      limit: 1,
    });

    if (customer.data.length === 0) {
      customer = await stripe.customers.create({
        name: "Azaan",
        email: "Azaan@gmail.com",
        address: {
          line1: "123 Main St",
          line2: "sukkur",
          city: "Cityville",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      });
    } else {
      customer = customer.data[0];
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
      payment_method_types: ["card"],
      description: "E-Commerce",
      customer: customer.id,
      shipping: {
        name: "Azaan",
        address: {
          line1: "123 Main St",
          city: "Cityville",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      },
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
