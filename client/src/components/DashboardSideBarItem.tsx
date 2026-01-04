import { Link } from "react-router-dom";
import type { SideBarItemType } from "../types/dashboardTypes";

interface sideBarItemProps {
  item: SideBarItemType;
  open: boolean;
}

const DashboardSideBarItem: React.FC<sideBarItemProps> = ({ item, open }) => {
  return (
    <li className="">
      <Link
        to={item.href}
        className={`flex p-3 ring rounded-md gap-2 mb-2
      ${
        item.active
          ? "bg-blue-500 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
      >
        {item.icon && <span>{item.icon}</span>}
        {open && <span>{item.label}</span>}
      </Link>
    </li>
  );
};

export default DashboardSideBarItem;
