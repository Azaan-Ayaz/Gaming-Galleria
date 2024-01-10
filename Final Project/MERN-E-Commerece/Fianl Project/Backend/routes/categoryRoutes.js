const express = require("express")
const { requireSignIn, isAdmin } = require("../middleware/middleware")
const { categoryController, updateCategory, CategoryController, singleCategory, deteletCategory } = require("../controller/categoryController")

const router = express.Router()

// routes

// Create Category
router.post("/create-category", categoryController)

// Update Category
router.put("/update-category/:id",requireSignIn, isAdmin, updateCategory)

// get All
router.get("/category",CategoryController)

// get single category
router.get("/category/:slug",singleCategory)

// get delet Category by id
router.delete("/delete-category/:id", deteletCategory)

module.exports = router