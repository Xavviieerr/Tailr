import React, { useState } from "react";
import DashboardSideBarItem from "../DashboardSideBarItem";
import type { SideBarItemType } from "../../types/dashboardTypes";
import Logo from "../Logo";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";

interface dashboardSideBarProps {
	items: SideBarItemType[];
}

const DashboardSideBar: React.FC<dashboardSideBarProps> = ({ items }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const handleToggle = () => setIsOpen((prev) => !prev);

	return (
		<aside
			className={`h-screen sticky top-0 left-0 bg-[#212772] text-white transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl
            ${isOpen ? "w-72" : "w-20"}`}
		>
			<div
				className={`flex items-center justify-between p-6 bg-white mb-6 ${!isOpen && "flex-col gap-4"}`}
			>
				{isOpen && (
					<div className="animate-in fade-in duration-500">
						<Logo />
					</div>
				)}
				<button
					onClick={handleToggle}
					className="p-2 rounded-xl bg-[#212772] hover:bg-black/20 transition-colors border border-white/10"
				>
					{isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
				</button>
			</div>

			<nav className="flex-1 px-3 space-y-2">
				{items.map((item) => (
					<DashboardSideBarItem key={item.href} item={item} open={isOpen} />
				))}
			</nav>

			<div className="p-4 border-t border-white/10">
				<SignOutButton>
					<button
						className={`
                        flex items-center gap-3 w-full p-3 rounded-xl 
                        text-white/70 hover:text-white hover:bg-red-500/20 
                        transition-all duration-200 group
                        ${!isOpen && "justify-center"}
                    `}
					>
						<LogOut
							size={22}
							className="min-w-[22px] group-hover:-translate-x-1 transition-transform"
						/>
						{isOpen && (
							<span className="font-medium animate-in fade-in slide-in-from-left-2">
								Sign Out
							</span>
						)}
					</button>
				</SignOutButton>
			</div>
		</aside>
	);
};

export default DashboardSideBar;
