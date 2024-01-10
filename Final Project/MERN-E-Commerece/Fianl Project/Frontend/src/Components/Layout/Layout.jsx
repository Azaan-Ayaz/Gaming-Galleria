import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[100vh]">
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  keywords: "mern, react, node, mongodb, gaming, shopping",
  author: "Azaan-Ayaz",
};

export default Layout;
