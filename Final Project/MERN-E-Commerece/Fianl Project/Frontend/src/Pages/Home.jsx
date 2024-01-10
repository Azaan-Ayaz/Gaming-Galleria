import React, { useEffect, useState } from "react";
import Layout from "./../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, [page]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    toast.success("Product added to cart");
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout title={"All Products"}>
      <div className="relative">
        <img
          src="https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg"
          alt=""
          className="w-full h-auto"
        />
        <div className="absolute top-2/4 left-1/5 transform -translate-y-1/2 text-white text-7xl font-semibold ml-5 flex translate-x-14">
          Gaming brings people together
        </div>
        <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 mt-3 text-white text-4xl p-8">
          A Well Designed Virtual Gaming Solution
        </div>
        <div></div>
      </div>

      <div className=" bg-white">
        <div className="grid grid-cols-1  items-center  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5  gap-y-9">
          {products.length > 0 ? (
            products.map((item) => (
              <div
                key={item._id}
                className="bg-opacity-40  p-6 shadow-sm flex flex-wrap w-3/4 hover:p-1 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={`http://localhost:8080/product-image/${item._id}`}
                  className="w-full h-48 object-cover"
                  alt={item.name}
                />
                <div className="">
                  <div className="text-xl text-gray-800 font-semibold mb-2">
                    {item.name}
                  </div>
                  <p className="text-gray-600 mb-2">
                    {item.description.substring(0, 15)}
                  </p>
                  <p className="text-gray-800 mb-2">${item.price}</p>
                  <div className="flex justify-between gap-20 items-center">
                    <button
                      className="bg-black flex flex-shrink-0 bg-opacity-60 text-white text-lg font-semibold p-1 rounded-lg"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      More Details
                    </button>
                    <div className="w-[25px]  h-[25px]">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(item)}
                      >
                        <FaCartPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available</p>
          )}
        </div>
        <div className="flex items-end justify-end">
          {products && products.length < total && (
            <button
              onClick={() => setPage(page + 1)}
              className="mt-4 bg-gradient-to-tr from-purple-500 via-blue-500 to-pink-500 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
