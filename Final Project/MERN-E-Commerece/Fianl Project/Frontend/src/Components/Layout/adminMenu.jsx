import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="list-group">
      <div className="text-4xl ml-3 mb-6 font-orbitron font-semibold flex justify-center mt-2">
        Admin Panel
      </div>
      <div className="flex flex-col ml-9 ">
        <div className="border w-full h-10 p-4 flex justify-center rounded-tr rounded-tl items-center">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item flex justify-center list-group-item-action "
          >
            Create Category
          </NavLink>
        </div>
        <div className="border w-full h-10 p-4 flex items-center  justify-center">
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item flex justify-center list-group-item-action "
          >
            Create Product
          </NavLink>
        </div>
        <div className="border w-full h-10 p-4 flex items-center  justify-center">
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item flex justify-center list-group-item-action "
          >
            Products
          </NavLink>
        </div>
        <div className="border w-full p-4 h-10 flex justify-center  items-center">
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item flex rounded-b-md justify-center list-group-item-action "
          >
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
