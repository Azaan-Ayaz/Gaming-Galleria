import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from "../Components/Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "../Components/Layout/Layout";

const FirstPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const backgroundStyle = {
    backgroundImage:
      'url("https://cdnb.artstation.com/p/assets/images/images/052/680/185/original/mikhail-sharov-spider-man-first-time-breakdown1.gif?1660405709")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
  };

  return (
    <>
      <div
        className="flex  min-h-[100vh]"
        style={backgroundStyle}
        variants={borderVariants}
      >
        <div className="">
          <div
            data-aos="fade-right"
            data-aos-offset="600"
            data-aos-easing="ease-in-sine"
            className="w-full border m-6 p-[12px] bg-black bg-opacity-60"
          >
            <div className="text-7xl font-orbitron font-bold text-white ">
              Gaming Galaria
            </div>
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-offset="600"
          data-aos-easing="ease-in-sine"
          className=" justify-center flex items-end mb-16"
        >
          <button
            className="border text-white bg-black text-xl font-medium bg-opacity-60 p-2"
            onClick={() => {
              [navigate("/home")];
            }}
          >
            View Products
          </button>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
