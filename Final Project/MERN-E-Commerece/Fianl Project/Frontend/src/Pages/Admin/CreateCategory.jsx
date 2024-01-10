import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/adminMenu";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import CategoryForm from "./../../Components/Form/categoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  // Handle Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        // Refresh categories after creating a new one
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in the input form");
    }
  };

  // Delete Category
  const DeleteProduct = async ({ id }) => {
    const { data } = await axios.delete(
      `http://localhost:8080/delete-category/${id}`
    );
    console.log(data);
    toast.success(`${data.Delete.name} is deleted`);
    getAllCategory();
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the category on the server
      const { data } = await axios.put(
        "http://localhost:8080/update-category",
        { id: editingCategory._id, newName: name }
      );
      if (data?.success) {
        toast.success(`${editingCategory.name} is updated`);
        // Refresh categories after updating
        getAllCategory();
        // Clear editing state
        setEditingCategory(null);
        // Clear input field
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in the update process");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Category"}>
      <div className="flex gap-x-40 mt-6">
        <AdminMenu />
        <div className="flex flex-col w-2/3">
          <div className="text-5xl font-orbitron font-semibold flex justify-center mb-3">
            Manage Category
          </div>
          <div className="mt-9">
            {/* Use CategoryForm for creating and updating */}
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              // Pass handleUpdate as onUpdate prop
              onUpdate={handleUpdate}
            />
          </div>
          <div className="w-full overflow-hidden rounded-lg shadow-md">
            <table className="w-full whitespace-no-wrap bg-white border border-gray-300">
              <thead>
                <tr className="bg-orange-500">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">NAME</th>
                  <th className="py-2 px-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, index) => (
                  <tr
                    key={item._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4 text-center">{item.name}</td>
                    <td className="py-2 px-4 text-center">
                      {/* <button
                        className="py-1 px-3 bg-green-500 mx-2 text-white rounded"
                        onClick={() => {
                          // Set the category to be updated
                          setEditingCategory(item);
                          // Set the form input to the category's name
                          setName(item.name);
                        }}
                      >
                        <FaEdit />
                      </button> */}

                      <button
                        className="py-1 px-3 bg-red-500 mx-2 text-white rounded"
                        onClick={() => DeleteProduct({ id: item._id })}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
