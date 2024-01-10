import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/adminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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

  // Create Product Function
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);

      // Change here: Append the category field with the ObjectId
      productData.append("category", category);

      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);

      // Send a POST request to create a new product
      const { data } = await axios.post(
        "http://localhost:8080/create-product",
        productData
      );

      if (data.success) {
        toast.success("Product created Successfully");
        // Redirect to the products page after successful creation

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
    const selectedCategory = categories.find(
      (cat) => cat._id === e.target.value
    );
    setCategory(selectedCategory?._id || ""); // Use the ObjectId or an empty string if not found
  };

  return (
    <Layout title={"Dashboard - Product"}>
      <div className="flex gap-x-40 mt-6 mb-6">
        <AdminMenu />
        <div className="w-full m-3">
          <div className="text-5xl font-orbitron font-semibold flex justify-center mb-3">
            Create Product
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
              {/* Map through categories and create options */}
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
              {image && (
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : ""}
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
                value={shipping}
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
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
