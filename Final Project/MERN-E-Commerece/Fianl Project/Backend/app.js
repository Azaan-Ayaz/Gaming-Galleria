// app.js
// import Category from './../Frontend/src/Pages/Category';
const express = require("express");
const app = express();
const DataBase = require("./DataBase/DB");
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const CategoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productsRoutes");
DataBase();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", authRoute); // Use authRoute here
app.use("/", CategoryRoute);
app.use("/", productRoute);

app.all("/", (req, res) => {
  res.send("<h1>Welcome to e-Commerce App</h1>");
});

module.exports = app;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkY2I5YjkzMjlmZmZkNDYzMjAxY2EiLCJpYXQiOjE3MDM4Nzg4OTUsImV4cCI6MTcwNjQ3MDg5NX0.B5-AkxEhf90JWjualvGw3inPiCrp8IME7PqI1x8X2cE
