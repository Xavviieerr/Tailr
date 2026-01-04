import DashboardSideBar from "../components/layout/DashboardSideBar";
import { SignOutButton } from "@clerk/clerk-react";
import { type SideBarItemType } from "../types/dashboardTypes";
import { FileText, Home, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashboardNavBar from "../components/layout/DashboardNavBar";

const Dashboard = () => {
  const location = useLocation();

  const sideBarItemProps: SideBarItemType[] = [
    { label: "Dashboard", href: "/dashboard/home", icon: <Home /> },
    {
      label: "my Applicatons",
      href: "/dashboard/applications",
      icon: <FileText />,
    },
    {
      label: "profile",
      href: "/dashboard/profile",
      icon: <User />,
    },
  ].map((item) => ({
    ...item,
    active: location.pathname === item.href,
  }));

  return (
    <div className="flex">
      <DashboardSideBar items={sideBarItemProps} />
      <div className="w-full h-screen ">
        <DashboardNavBar />
        <main className="h-[88%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
