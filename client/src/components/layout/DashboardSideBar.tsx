import React, { useState } from "react";
import DashboardSideBarItem from "../DashboardSideBarItem";
import type { SideBarItemType } from "../../types/dashboardTypes";
import Logo from "../Logo";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Lightbulb,
  LightbulbOff,
} from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";

interface dashboardSideBarProps {
  items: SideBarItemType[];
}
const DashboardSideBar: React.FC<dashboardSideBarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpenandClose = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <aside
      className={` h-screen shadow-[10px_0_10px_0_rgba(0,0,0,0.2)] backdrop-blur-lg
    ${
      isOpen ? "w-[21%]" : "w-[5%]"
    } transition-all duration-500 overflow-hidden`}
    >
      <>
        <div className="flex bg-blue-200 justify-between py-4 px-[3%] ">
          {isOpen && <Logo />}
          <button onClick={handleOpenandClose}>
            {isOpen ? <ArrowBigLeft /> : <ArrowBigRight />}
          </button>
        </div>
        <nav className="p-3 mt-10">
          {items.map((item) => (
            <DashboardSideBarItem key={item.href} item={item} open={isOpen} />
          ))}
        </nav>
      </>
      <div className="flex flex-col p-3 mt-[75%]">
        {/* <button className="ring rounded-md gap-2 mb-2 text-gray-400 hover:text-white hover:bg-gray-800">
          {<LightbulbOff />} {"Dark Mode"}
        </button> */}
        <button className="ring rounded-md gap-2 mb-2 text-gray-400 hover:text-white hover:bg-gray-800">
          <SignOutButton />
        </button>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
