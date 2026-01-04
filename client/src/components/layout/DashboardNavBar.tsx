import React from "react";
import Image from "/public/tailr.svg";

const DashboardNavBar = () => {
  return (
    <nav className="flex items-center px-[3%] justify-between h-[9%] shadow-md">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center justify-center">
        <img
          className="h-10 w-10 border-2 border-blue-400 rounded-full "
          src={Image}
          alt="profile picture"
        />
      </div>
    </nav>
  );
};

export default DashboardNavBar;
