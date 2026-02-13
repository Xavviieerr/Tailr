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
		{ label: "Dashboard", href: "/dashboard/home", icon: <Home size={20} /> },
		{
			label: "My Applications",
			href: "/dashboard/applications",
			icon: <FileText size={20} />,
		},
		{ label: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
	].map((item) => ({
		...item,
		active: location.pathname === item.href,
	}));

	return (
		<div className="flex h-screen w-full bg-gray-50 overflow-hidden">
			<DashboardSideBar items={sideBarItemProps} />

			<div className="flex flex-col flex-1 min-w-0">
				<DashboardNavBar />
				<main className="flex-1 overflow-y-auto p-4 md:p-8">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};
