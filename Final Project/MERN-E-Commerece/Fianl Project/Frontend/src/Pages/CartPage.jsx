import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
// import CheckoutForm from "./CheckoutForm";
import Checkout from "./Checkout";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from the cart");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = () => {
    toast.success("Your Response Has Been Submitted");
    setCart("");
    setTimeout(() => {
      navigate("/checkout");
      setCart([]);
    }, 1000);
  };

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("http://localhost:8080/payment", {
  //       nonce,
  //       cart,
  //     });

  //     if (data && data.orderId) {
  //       navigate(`/dashboard/user/orders/${data.orderId}`);
  //       toast.success("Payment completed successfully");
  //     } else {
  //       console.log("Payment Error:", data);
  //       toast.error("Payment failed. Please try again.");
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     console.log("Payment Error:", error);
  //     setLoading(false);
  //     toast.error("Payment failed. Please try again.");
  //   }
  // };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout title={"Cart"}>
      <div className="  ">
        <div>
          <div className="relative">
            <img
              src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1704416487~exp=1704417087~hmac=8570e83dbeb9252d5b94904888daf6976c80e63a6c2cec961e3ccacc1bdbd5b6"
              alt=""
              className="w-full h-auto"
            />
            <div>
              <div
                className="absolute top-1/2 underline transform -translate-x-1/2 -translate-y-1/2 text-black text-7xl font-semibold ml-5 flex justify-center"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                MY CART
              </div>
              <div
                className="absolute top-2/3
           left-1/4 transform -translate-x-1/2 -translate-y-1/2 mt-3 text-black text-4xl p-8"
              ></div>
            </div>
          </div>
        </div>
        <div className=" mx-auto p-8">
          <div className="text-4xl font-semibold mb-8">Products</div>

          {cart.length > 0 ? (
            <div className="flex flex-col md:flex-row justify-around">
              <div className="md:w-full gap-3 flex-wrap flex  h-full pr-4">
                {cart.map((item) => (
                  <div key={item._id} className="mb-6">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <img
                        src={`http://localhost:8080/product-image/${item._id}`}
                        className="w-full h-48 object-cover"
                        alt={item.name}
                      />
                      <div className="p-4">
                        <div className="font-semibold text-lg mb-2">
                          {item.name}
                        </div>
                        <p className="text-gray-600 mb-2">
                          {item.description.substring(0, 50)}
                        </p>
                        <div className="font-semibold text-lg mb-2">
                          Price: $ {item.price}
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:w-1/4">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-xl font-semibold mb-4">Cart Summary</div>
                  <hr className="mb-4" />

                  <div className="flex justify-between mb-4">
                    <div className="text-lg">Total Items:</div>
                    <div className="text-lg">{cart.length}</div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="text-lg">Subtotal:</div>
                    <div className="text-lg">
                      $ {cart.reduce((acc, item) => acc + item.price, 0)}
                    </div>
                  </div>

                  {auth?.user?.address ? (
                    <div className="flex flex-col mb-4">
                      <div className="font-semibold text-lg">
                        Current Address:
                      </div>
                      <div>{auth?.user.address}</div>
                      <button
                        className="bg-orange-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-orange-700"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  ) : (
                    <div>
                      {auth?.token ? (
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-orange-700"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-orange-700"
                          onClick={() => navigate("/login")}
                        >
                          Please Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                  <div>
                    {/* <button onClick={handlePayment}>Proceed To Payment</button> */}
                    <Checkout />
                  </div>

                  {/* {clientToken && (
                    
                  )} */}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-lg">Your Cart is Empty</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
