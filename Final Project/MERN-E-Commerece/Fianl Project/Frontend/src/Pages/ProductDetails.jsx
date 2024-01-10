import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./../Components/Layout/Layout";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/get-product/${params.slug}`
      );
      console.log("Product data:", data?.product);
      setProduct(data?.product);
      if (data?.product) {
        similarProduct(data?.product._id, data?.product.category?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // related product
  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products); // Assuming the key is 'products' in the response
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        {Object.keys(product).length > 0 ? ( // Check if product is not empty
          <div className="flex justify-around">
            <div className="">
              <img
                src={`http://localhost:8080/product-image/${product._id}`}
                className="w-full h-48 object-cover"
                alt={product.name}
              />
            </div>
            <div className="">
              <div className="text-2xl font-orbitron font-semibold">
                Product Details
              </div>
              <div>Name: {product.name}</div>
              <div>Description: {product.description}</div>
              <div>Price: {product.price}</div>
              <div>Category: {product.category?.name}</div>
              {/* <div>Category: {product.category}</div> */}
              <button className="btn btn-primary">
                <FaCartPlus />
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div>Similar Products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {relatedProduct.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={`http://localhost:8080/product-image/${item._id}`}
                className="w-full h-48 object-cover"
                alt={item.name}
              />
              <div className="p-4">
                <div className="text-xl font-semibold mb-2">{item.name}</div>
                <p className="text-gray-700 mb-2">
                  {item.description.substring(0, 15)} ...
                </p>
                <p className="text-gray-700 mb-2">{item.price}</p>
                <div className="flex justify-between items-center">
                  <button className="btn btn-primary">
                    <FaCartPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
