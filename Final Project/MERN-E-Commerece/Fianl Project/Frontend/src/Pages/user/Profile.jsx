import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "./../../Components/Layout/userMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { IoPersonSharp, IoPhonePortraitSharp } from "react-icons/io5";
import { MdLocationOn, MdEmail, MdLock } from "react-icons/md";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:8080/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls)); // Corrected getItem to setItem
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed. Something went wrong.");
    }
  };

  return (
    <Layout title={"Your - Profile"}>
      <div className="flex justify-center items-center py-2 bg-orange-500 bg-opacity-60 min-h-[82vh]">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
          <UserMenu />

          <div className="text-3xl font-semibold text-center text-orange-500 mb-8">
            USER PROFILE
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <IoPersonSharp className="w-5 h-5 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border-2 rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
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
                <MdEmail className="w-5 h-5 mr-2" />
                Email
              </label>
              <input
                type="text"
                id="email"
                className="border-2 rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                placeholder="Enter your email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <MdLock className="w-5 h-5 mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2 rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                placeholder="Password must be 8 digits"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="text-orange-500 text-lg font-semibold mb-2 flex items-center"
              >
                <IoPhonePortraitSharp className="w-5 h-5 mr-2" />
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="border-2 rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
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
                <MdLocationOn className="w-5 h-5 mr-2" />
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border-2 rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white text-lg px-6 py-3 rounded-md font-semibold hover:bg-orange-700 transition duration-300"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
