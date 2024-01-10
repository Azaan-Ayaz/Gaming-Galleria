import React from "react";
import Layout from "../Components/Layout/Layout";
import { usesearch } from "../context/search";
import { FaCartPlus } from "react-icons/fa"; // Import FaCartPlus

const Search = () => {
  const [values] = usesearch(); // Removed setValues as it's not used in this component

  console.log("Search Results:", values.results);

  return (
    <Layout title={"Search - Results"}>
      <div className="flex flex-col items-center">
        <div className="text-6xl">Search Results</div>
        <div className="text-2xl">
          {values?.results.length < 1
            ? "No products found"
            : `Found ${values?.results.length} products`}
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {values.results.length > 0 ? (
            values.results.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg  overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={`http://localhost:8080/product-image/${item._id}`}
                  className="w-full h-48 object-cover"
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="text-xl font-semibold mb-2">{item.name}</div>
                  <p className="text-gray-700 mb-2">
                    {item.description.substring(0, 30)}...
                  </p>
                  <p className="text-gray-700 mb-2">{item.price}</p>
                  <div className="flex justify-between items-center">
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-primary">
                      <FaCartPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
