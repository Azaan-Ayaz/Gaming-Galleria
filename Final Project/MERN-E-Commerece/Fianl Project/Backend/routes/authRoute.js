const express = require("express");
const {
  registerController,
  loginController,
  forgotPassword,
  testController,
  updateProfileController,
  getOrdersController,
} = require("../controller/authController");

const { requireSignIn, isAdmin } = require("../middleware/middleware");

const router = express.Router();

// Register || Method Post
router.post("/register", registerController);

// Login || Method Post
router.post("/login", loginController);

// Forgot Password || Method Post
router.post("/forgot-password", forgotPassword); // Added the missing forward slash at the beginning

// test
router.all("/test", requireSignIn, testController);

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// orders

router.get("/orders", requireSignIn, getOrdersController);

// updateProfile
router.put("/profile", updateProfileController); // Added requireSignIn middleware here

module.exports = router;
