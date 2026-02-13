import React from "react";
import { useUser } from "@clerk/clerk-react";
import Loader from "../components/Loader";

const DashboardProfile = () => {
	const { isLoaded, user } = useUser();

	if (!isLoaded) {
		return <Loader />;
	}
	if (!user) {
		return (
			<div className="p-10 text-center">
				No user session found. Please log in.
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-4 sm:p-8">
			<div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
				<div className="h-32 bg-gradient-to-r from-[#212774] to-[#3a45c2]" />

				<div className="px-8 pb-8">
					<div className="relative -mt-16 mb-6">
						<img
							src={user.imageUrl}
							alt="Profile"
							className="w-32 h-32 rounded-2xl border-4 border-white shadow-md object-cover"
						/>
					</div>

					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								{user.fullName || "User Profile"}
							</h1>
							<p className="text-gray-500 font-medium">
								{user.primaryEmailAddress?.emailAddress}
							</p>
						</div>

						{/* <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold text-sm">
							Manage Account
						</button> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
						{/* Account Details Card */}
						<div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
							<h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
								Personal Information
							</h3>
							<div className="space-y-4">
								<div>
									<label className="text-xs text-gray-500">First Name</label>
									<p className="text-gray-800 font-medium">{user.firstName}</p>
								</div>
								<div>
									<label className="text-xs text-gray-500">Last Name</label>
									<p className="text-gray-800 font-medium">{user.lastName}</p>
								</div>
							</div>
						</div>

						{/* Session Info Card */}
						<div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
							<h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
								Account Security
							</h3>
							<div className="space-y-4">
								<div>
									<label className="text-xs text-gray-500">Member Since</label>
									<p className="text-gray-800 font-medium">
										{user.createdAt
											? new Date(user.createdAt).toLocaleDateString()
											: "N/A"}
									</p>
								</div>
								<div>
									<label className="text-xs text-gray-500">Last Active</label>
									<p className="text-gray-800 font-medium">
										{user.lastSignInAt
											? new Date(user.lastSignInAt).toLocaleTimeString()
											: "Just now"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardProfile;
