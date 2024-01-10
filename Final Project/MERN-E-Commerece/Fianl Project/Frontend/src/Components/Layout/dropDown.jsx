// CustomDropdown.js

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CustomDropdown = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block cursor-pointer text-left">
      <div>
        <div
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white hover:text-[#ED1C24] items-center  focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
          id="options-menu"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          onBlur={closeDropdown}
          tabIndex="0"
        >
          <div className="py-1">
            <li>
              <NavLink
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                DASHBOARD
              </NavLink>
            </li>
            <button
              to="/login"
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
