// import React from "react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/adminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const params = useParams();

  // get Single Product
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/get-product/${params.slug}`
      );
      // console.log(params.data);
      // const result = response.data;
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
      // const res = response.data;
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
  };

  useEffect(() => {
    singleProduct();
    // eslint-disable
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      // Fetch categories from the server
      const { data } = await axios.get("http://localhost:8080/category");
      if (data?.success) {
        // Set categories in the state
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    // Call getAllCategory function when the component mounts
    getAllCategory();
  }, []);

  // update Product Function
  const handleupdate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);

      // Check if category is not null before appending
      if (category !== null) {
        // Change here: Append the category field with the ObjectId
        productData.append("category", category);
      }

      productData.append("price", price);
      productData.append("quantity", quantity);

      // Check if image is not null before appending
      image && productData.append("image", image);

      // Send a PUT request to update a product
      const { data } = await axios.put(
        `http://localhost:8080/update-product/${id}`,
        productData
      );

      if (data.success) {
        toast.success("Product Updated Successfully");
        // Redirect to the products page after successful update
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong");
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    console.log("Selected value:", e.target.value);
    console.log("Categories:", categories);

    const selectedCategory = categories.find(
      (cat) => cat._id === e.target.value
    );

    console.log("Selected Category:", selectedCategory);

    setCategory(selectedCategory?._id || "");
  };

  // Delete a Product
  const HandleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product ?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Product"}>
      <div className="flex gap-x-40 flex-shrink-0  mt-6 mb-6">
        <AdminMenu />
        <div className="w-full m-3">
          <div className="text-5xl font-orbitron font-semibold flex justify-items-start mb-3">
            update Product
          </div>
          <div className="m-1 w-3/4">
            <label className="block mb-1 text-2xl font-medium text-orange-500 dark:text-orange-500">
              Select a category
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleCategoryChange}
              value={category}
            >
              {/* Default option */}
              <option value="">Select a category</option>
              {/* Map through categories and update options */}
              {categories?.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>

            <div className="m-3 mb-1">
              <label>
                {image && image.name}
                <input
                  className="w-full"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedImage = e.target.files[0];
                    setImage(selectedImage);
                  }}
                />
              </label>
            </div>

            <div className="mb-3">
              {image ? (
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : ""}
                  alt="Product Image"
                  height="200px"
                />
              ) : (
                <img
                  src={`http://localhost:8080/product-image/${id}`}
                  // src={image instanceof File ? URL.updateObjectURL(image) : ""}
                  alt="Product Image"
                  height="200px"
                />
              )}
            </div>

            <div className="mb-3">
              <label className="block text-2xl mb-1 font-medium text-orange-500 dark:text-orange-500">
                Name
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={name}
                placeholder="Enter product name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-2xl mb-1 font-medium text-orange-500 dark:text-orange-500">
                Description
              </label>
              <textarea
                className="w-full p-2 border  rounded"
                value={description}
                placeholder="Enter product description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-2xl mb-1 font-medium text-orange-500 dark:text-orange-500">
                Price
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={price}
                placeholder="Enter product price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-2xl font-medium text-orange-500 dark:text-orange-500">
                Quantity
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={quantity}
                placeholder="Enter product quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-2xl font-medium text-orange-500 dark:text-orange-500">
                Shipping
              </label>
              <select
                className="w-full p-2 border rounded"
                type="text"
                value={shipping ? "Yes" : "No"}
                placeholder="Enter shipping details"
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="">Shipping Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-orange-500 rounded-md p-2 text-lg font-semibold hover:bg-orange-700"
                onClick={handleupdate}
              >
                Update Product
              </button>
              <button className="btn btn-danger" onClick={HandleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
