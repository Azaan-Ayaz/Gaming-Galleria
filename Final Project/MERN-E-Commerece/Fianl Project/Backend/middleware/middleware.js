const JWT = require("jsonwebtoken");
const userModel = require("../models/model");

// protected route token based
// middleware.js

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token is missing. Authorization denied.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user information:", decoded);
    req.user = decoded; // Set decoded user information to req.user
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "There is an error in the token. Authorization denied.",
    });
  }
};

// isAdmin
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = { requireSignIn, isAdmin };

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2MzA1ZmM2NDUyNWU1MzU0ZDcwM2IiLCJpYXQiOjE3MDIyNDQ0NDcsImV4cCI6MTcwMjUwMzY0N30.Co_bTVXtyka9bUfq4mcvF5L4HcF538WOLgLWf3H2ijA

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2YWE2MjJjZGExZTMxN2YyMGRiYzciLCJpYXQiOjE3MDIyNzU4MjYsImV4cCI6MTcwMjUzNTAyNn0.kNqQQN_9H6Fy7eJSd0GVn6FKW58FEMOpp1JfKwxQJms
