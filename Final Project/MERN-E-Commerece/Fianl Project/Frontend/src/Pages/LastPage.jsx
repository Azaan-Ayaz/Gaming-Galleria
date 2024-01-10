import React from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const LastPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative">
        <img
          src="https://img.freepik.com/premium-photo/toy-shopping-cart-with-boxes-blue-background_339191-217.jpg"
          alt=""
          className="w-full h-auto"
        />
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-black text-7xl font-semibold ml-5 flex justify-center">
          THANKS FOR SHOPPING
        </div>
        <div className="absolute top-2/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 mt-3 text-black text-4xl p-8">
          <p className="mb-4">
            Your order has been successfully placed. We appreciate your
            business!
          </p>
          <p className="mb-4">
            For any inquiries or assistance, please contact our customer
            support.
          </p>
          <p>Stay tuned for updates on your order status. Happy shopping!</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </>
  );
};

export default LastPage;
