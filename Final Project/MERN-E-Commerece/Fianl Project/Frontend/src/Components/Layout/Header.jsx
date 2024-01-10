import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { IoMdHome } from "react-icons/io";
import SearchInput from "./../searchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { MdOutlineLogin } from "react-icons/md";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const categories = useCategory;

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b bg-opacity-100 from-transparent to-gray-900 text-white md:p-6 h-20 flex items-center">
      <div className="flex-shrink-0">
        <div className="mx-1 gap-4 md:text-5xl flex font-orbitron h-[60px]">
          Gaming Galleria
        </div>
      </div>
      <div className="flex ml-auto">
        <ul className="flex gap-6 mx-3 w-full">
          <div className="flex justify-center ">
            <SearchInput
              className="text-black"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div></div>
          <li className="align-middle">
            <NavLink
              to="/home"
              className={`text-white hover:text-gray-300 font-semibold ${
                isCurrentPage("/home") && "border-b-[3px] border-white"
              }`}
            >
              <IoMdHome
                style={{ width: "25px", height: "25px", color: "your-color" }}
              />
            </NavLink>
          </li>

          <li className="align-middle">
            <NavLink
              to="/about"
              className={`text-white hover:text-gray-300 font-semibold ${
                isCurrentPage("/category") && "border-b-[3px] border-white"
              }`}
            >
              ABOUT
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li className="align-middle">
                <NavLink
                  to="/register"
                  className={`text-white hover:text-gray-300 font-semibold ${
                    isCurrentPage("/register") && "border-b-[3px] border-white"
                  }`}
                >
                  REGISTER
                </NavLink>
              </li>
              <li className="align-middle">
                <NavLink
                  to="/login"
                  className={`text-white hover:text-gray-300 flex font-semibold ${
                    isCurrentPage("/login") && "border-b-[3px] border-white"
                  }`}
                >
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth?.user?.name.toUpperCase()}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    DASHBOARD
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    LOGOUT
                  </Link>
                </li>
              </ul>
            </li>
          )}
          <li className="align-middle">
            <NavLink
              to="/cart"
              className={`text-white relative hover:text-gray-300 font-semibold ${
                isCurrentPage("/cart") && "border-b-[3px] border-white"
              }`}
            >
              CART
              <div className="absolute top-[-8px] right-[-8px] bg-[white] text-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart?.length}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
