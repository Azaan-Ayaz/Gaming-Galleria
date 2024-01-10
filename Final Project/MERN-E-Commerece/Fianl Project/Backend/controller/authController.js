const userModel = require("../models/model");
const { hashPassword, comparePassword } = require("../Helper/authHelper");
const JWT = require("jsonwebtoken");
// // At the top of your authController.js or wherever you configure your app
require("dotenv").config();

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, answer } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered. Please login",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save the user
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Validate the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30y",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email || !answer || !newPassword) {
      return res
        .status(400)
        .send({ message: "Email, answer, and new password are required" });
    }

    // Check user
    const user = await userModel.findOne({ email, answer });

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Hash and update password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// test Controller
const testController = (req, res) => {
  // console.log("Protected Routes")
  res.send("Protected Routes");
};

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Find the user by email (or any other identifier)
    const user = await userModel.findOne({ email });

    // Check if user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check password length
    if (password && password.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Password is required and must be at least 8 characters long.",
      });
    }

    // Hash the new password if provided
    const newPassword = password ? await hashPassword(password) : undefined;

    // Update user information
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id, // Use the user's _id directly
      {
        name: name || user.name,
        password: newPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const getOrdersController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = updateProfileController;

module.exports = {
  registerController,
  updateProfileController,
  testController,
  loginController,
  forgotPassword,
  getOrdersController,
};
