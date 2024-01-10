import React, { useEffect, useState } from "react";
import AdminMenu from "./../../Components/Layout/adminMenu";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FaCartPlus } from "react-icons/fa6";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Life Cycle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All - Products"}>
      <div className="flex flex-initial gap-x-40 mt-6 mb-6">
        <div className=" w-3/12 ">
          <AdminMenu />
        </div>
        <div className="w-full m-3">
          <div className="text-5xl font-orbitron font-semibold flex justify-center mb-3">
            All Products List
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Map through each product in the 'products' array */}
            {products.map((item, index) => (
              /* 'Link' component to navigate to the individual product page */
              <Link key={item._id} to={`/dashboard/admin/product/${item.slug}`}>
                {/* Product card container */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  {/* Product image */}
                  <img
                    src={`http://localhost:8080/product-image/${item._id}`}
                    className="w-full h-48 object-cover"
                    alt={item.name}
                  />
                  {/* Product details */}
                  <div className="p-4">
                    {/* Product name */}
                    <div className="text-xl font-semibold mb-2">
                      {item.name}
                    </div>
                    {/* Product description */}
                    <p className="text-gray-700 overflow-y-scroll h-16">
                      {item.description}
                    </p>
                    {/* Price and Add to Cart button */}
                    <div className="mt-4 flex items-center justify-center">
                      {/* Product price */}
                      <div className="text-orange-500 font-bold">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
