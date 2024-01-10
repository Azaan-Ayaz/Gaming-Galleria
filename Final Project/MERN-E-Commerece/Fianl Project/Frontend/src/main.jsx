import React from "react";
import ReactDOM from "react-dom/client";
// import App from './Router.jsx'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router.jsx";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from "./context/cart.jsx";

// import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
  // </React.StrictMode>
);
