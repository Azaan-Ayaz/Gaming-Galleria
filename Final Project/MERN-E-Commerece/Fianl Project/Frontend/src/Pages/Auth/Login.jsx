import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "./../../Components/Layout/Layout";
import { CiLock } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); // line for global state
        navigate(location.state || "/"); // Redirect to the dashboard after a successful login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const backgroundImageUrl =
    "https://rare-gallery.com/uploads/posts/585295-blue-controller.jpg";

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div
        className="flex items-center  justify-center min-h-[100vh]"
        style={backgroundStyle}
      >
        <motion.div
          className="w-96 h-[65vh] rounded-md flex flex-col items-center bg-black bg-opacity-75 p-8"
          initial="hidden"
          animate="visible"
          variants={borderVariants}
        >
          <div className="text-[40px] underline text-white font-orbitron font-semibold">
            Login
          </div>
          <form className="mt-2 w-full max-w-md" onSubmit={loginSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="text-white text-lg font-semibold mb-2 flex items-center"
              >
                <IoPersonSharp className="w-5 h-5 mr-1 flex align-text-bottom" />
                Email
              </label>
              <input
                type="text"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Password"
                className="text-white flex text-lg font-semibold mb-2 items-center"
              >
                <CiLock className="w-5 h-5 mr-1 flex align-text-bottom" />
                Password
              </label>
              <input
                type="password"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-t from-blue-700 to-blue-400 text-white text-2xl p-2 rounded-md font-semibold hover:bg-orange-800 mt-4 w-96 transition duration-300">
                Login
              </button>
            </div>
            {/* <div className="flex justify-center">
              <button
                className="bg-orange-500 text-white text-2xl p-2 rounded-md font-semibold hover:bg-orange-800 mt-7 w-96 transition duration-300"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div> */}
          </form>
        </motion.div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;
