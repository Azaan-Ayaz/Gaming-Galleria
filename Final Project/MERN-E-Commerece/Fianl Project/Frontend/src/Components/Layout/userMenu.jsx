import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <div className="list-group">
        {/* <div className='text-4xl font-orbitron font-semibold flex justify-center mt-2'>Admin Panel</div> */}
        <div className="flex flex-col ml-9 ">
          <div className="border w-full h-10 p-4 flex justify-center rounded-tr rounded-tl items-center">
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item flex justify-center list-group-item-action "
            >
              Profile
            </NavLink>
          </div>
          {/* <div className='border w-full h-10 p-4 flex items-center  justify-center'>
          <NavLink to="/dashboard/user/orders" className="list-group-item flex justify-center list-group-item-action ">
            Orders
          </NavLink>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
