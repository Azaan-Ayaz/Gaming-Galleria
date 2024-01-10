import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Policy from "./Pages/Policy";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Category from "./Pages/About";
import Dashboard from "./Pages/user/Dashboard";
// import PrivateFunction from './Components/Route/privateRoute'
// import ForgotPassword from './Pages/Auth/ForgotPassword'
import AdminRoute from "./Components/Route/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PrivateRoute from "./Components/Route/privateRoute";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import User from "./Pages/Admin/User";
import Order from "./Pages/user/Order";
import Profile from "./Pages/user/Profile";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import FirstPage from "./Pages/First";
// import Dashboard from './User/Dashboard'
import CartPage from "./Pages/CartPage";
import AboutUs from "./Pages/About";
import LastPage from "./Pages/LastPage";
import Checkout from "./Pages/Checkout";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" Component={PrivateRoute}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/dashboard" Component={AdminRoute}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<User />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/last" element={<LastPage />} />
      </Routes>
    </>
  );
};

export default Router;
