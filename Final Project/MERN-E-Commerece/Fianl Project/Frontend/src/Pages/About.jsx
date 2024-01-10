import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout title={"About Us - Ecommerce"}>
      <div className="bg-black">
        <div className="  relative">
          <img
            // src="https://i.makeagif.com/media/5-27-2017/1it9YM.gif"
            src="https://wallpaperaccess.com/full/8088658.gif"
            alt=""
            className=""
          />
          <div>
            <div
              className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl font-semibold ml-5 flex justify-center"
              data-aos="fade-right"
              data-aos-offset="500"
              data-aos-easing="ease-in-sine"
            >
              ABOUT-US
            </div>
            <div
              className="absolute top-2/3
           left-1/4 transform -translate-x-1/2 -translate-y-1/2 mt-3 text-white text-4xl p-8"
            >
              Welcome to Our Ecommerce Platform
            </div>
          </div>
        </div>
        <div className="bg-white ml-3 ">
          <div className="flex justify-between m" data-aos="zoom-out-right">
            <div className="mt-10 ml-16 flex  flex-col w-1/3  ">
              <div className="text-5xl flex flex-shrink-0 mt-5 mb-3 font-bold ">
                INTRODUCTION
              </div>
              <div className=" text-justify text-xl font-normal align-top flex items-start">
                <p>
                  Building an e-commerce community involves creating spaces for
                  customers to connect, share experiences, and engage with your
                  brand. Utilize forums, social media, and exclusive groups.
                  Feature customer stories, host interactive events, and run
                  contests. Implement loyalty programs and seek customer
                  feedback. Encourage user-generated content, collaborate with
                  influencers, and organize offline events when possible.
                  Provide educational resources and consistently engage with
                  your community to foster lasting connections and brand
                  advocacy.
                </p>
              </div>
            </div>
            <div className="w-1/2 j m-3">
              <img
                src="https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg"
                alt=""
              />
            </div>
          </div>

          <div
            className="flex mb-16 mt-40 justify-around"
            data-aos="zoom-out-left"
          >
            <div className="mt-4 ml-9 w-2/3">
              <img
                src="https://visionsvcb.org/wp-content/uploads/2018/05/our-mission.png"
                alt=""
              />
            </div>
            <div className="flex justify-end ml- mr-20">
              <div className="flex p-1 w-1/2 flex-col">
                <div className="text-5xl flex flex-shrink-0 mt-5 mb-3 font-bold">
                  OUR MISSION
                </div>
                <div className=" text-justify text-xl font-normal align-top flex items-start">
                  <p>
                    Our commitment to customer satisfaction drives us to
                    continually innovate, adapt, and elevate the standards of
                    e-commerce. Whether you're seeking the latest trends or
                    timeless classics, we strive to offer a diverse range of
                    items, ensuring there's something for everyone. Join us in
                    creating a vibrant and convenient online shopping community
                    where your satisfaction is at the heart of our mission
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between mb-20 mt-40"
            data-aos="zoom-out-right"
          >
            <div className="mt-10 ml-16 flex  flex-col w-1/3  ">
              <div className="text-5xl flex flex-shrink-0 mt-5 mb-3 font-bold ">
                COMMUNITY BUILDING
              </div>
              <div className=" text-justify text-xl font-normal align-top flex items-start">
                <p>
                  Building an e-commerce community involves creating spaces for
                  customers to connect, share experiences, and engage with your
                  brand. Utilize forums, social media, and exclusive groups.
                  Feature customer stories, host interactive events, and run
                  contests. Implement loyalty programs and seek customer
                  feedback. Encourage user-generated content, collaborate with
                  influencers, and organize offline events when possible.
                  Provide educational resources and consistently engage with
                  your community to foster lasting connections and brand
                  advocacy.
                </p>
              </div>
            </div>
            <div className="w-1/2 j m-3">
              <img
                src="https://citinewsroom.com/wp-content/uploads/2022/10/Community_-Social-Media.png"
                alt=""
              />
            </div>
          </div>
          <div
            className="flex justify-between mb-20 mt-40"
            data-aos="zoom-out-left"
          >
            <div className="w-1/2 ml-16 pt-20 mt-3">
              <img
                src="https://img.freepik.com/premium-photo/vision-direction-future-business-inspiration-motivation-concept_161452-315.jpg"
                alt=""
              />
            </div>
            <div className="mt-10 mr-16 flex  flex-col w-1/3  ">
              <div className="text-5xl flex flex-shrink-0 mt-5 mb-3 font-bold ">
                Vision
              </div>
              <div className=" text-justify text-xl font-normal align-top flex items-start">
                <p>
                  "To be the leading e-commerce platform globally, recognized
                  for our commitment to excellence, innovation, and customer
                  satisfaction. We aspire to continuously redefine the online
                  shopping experience, leveraging cutting-edge technology and a
                  customer-centric approach. Our vision is to build a
                  sustainable and inclusive platform that transcends borders,
                  bringing people together through a shared passion for
                  discovery, value, and reliability." These statements
                  encapsulate the fundamental principles and long-term goals of
                  the e-commerce platform, emphasizing customer-centricity,
                  innovation, and global connectivity. It's important to tailor
                  these statements to align with the specific values and goals
                  of your e-commerce business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
