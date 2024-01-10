import React from "react";
import Layout from "./../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/userMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - ECommerce App"}>
      <div className="text-6xl text-center font-semibold font-orbitron m-3">
        USER PANEL
      </div>

      <div className="flex gap-14">
        <div className="w-1/4 h-10 font-2xl">
          <UserMenu />
        </div>
        <div className=" w-2/3 rounded-lg border-2 flex flex-col">
          <div className="m-3 text-2xl font-semibold">
            User Name = {auth?.user?.name}
          </div>
          <div className="m-3 text-2xl font-semibold">
            User Email = {auth?.user?.email}
          </div>
          <div className="m-3 text-2xl font-semibold">
            User Contact = {auth?.user?.phone}
          </div>
          <div className="m-3 text-2xl font-semibold">
            User Address = {auth?.user?.address}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
