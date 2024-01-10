import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "./../../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp, IoPhonePortraitSharp } from "react-icons/io5";
import { MdLocationOn, MdEmail, MdLock } from "react-icons/md";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: "url(https://wallpapercave.com/wp/wp10555973.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        // Use await and Promise to introduce a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Something went wrong.");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div
        className="flex items-center  justify-center min-h-[83vh]"
        style={backgroundStyle}
      >
        <motion.div
          className="w-[425px] h-[100vh] my-2 rounded-md mt-24 flex flex-col items-center bg-black bg-opacity-75 px-8"
          initial="hidden"
          animate="visible"
          variants={borderVariants}
        >
          <div className="text-[40px] font-orbitron  flex-shrink-0 font-semibold underline z-10 text-orange-500 p-4 rounded">
            Register Page
          </div>
          <form onSubmit={handleSubmit} className="mt-2 w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <IoPersonSharp className="w-5 h-5 mr-1 flex align-text-bottom" />
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <MdEmail className="w-5 h-5 mr-1 flex align-text-bottom" />
                Email
              </label>
              <input
                type="text"
                id="email"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <MdLock className="w-5 h-5 mr-1 flex align-text-bottom" />
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <IoPhonePortraitSharp className="w-5 h-5 mr-1 flex align-text-bottom" />
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <MdLocationOn className="w-5 h-5 mr-1 flex align-text-bottom" />
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border-2 rounded-md p-2 w-full"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white text-2xl p-2 rounded-md font-semibold hover:bg-orange-800 mt-3 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
