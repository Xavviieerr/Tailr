import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/DashboardHome";
import DashboardApplications from "../pages/DashboardApplications";
import DashboardProfile from "../pages/DashboardProfile";
import Loader from "../components/Loader";

const AppRoutes = () => {
	const { isLoaded, isSignedIn } = useAuth();

	if (!isLoaded) {
		return <Loader />;
	}
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Auth Routes */}
				<Route path="/login/*" element={<Login />} />
				<Route path="/sign-up/*" element={<Signup />} />

				{/* Root Redirect */}
				<Route
					path="/"
					element={
						isSignedIn ? (
							<Navigate to="/dashboard" replace />
						) : (
							<>
								<Navbar />
								<Home />
							</>
						)
					}
				/>

				{/* Protected Dashboard */}
				<Route
					path="/dashboard"
					element={
						isSignedIn ? <Dashboard /> : <Navigate to="/login" replace />
					}
				>
					<Route index element={<Navigate to="/dashboard/home" replace />} />
					<Route path="home" element={<DashboardHome />} />
					<Route path="applications" element={<DashboardApplications />} />
					<Route path="profile" element={<DashboardProfile />} />
				</Route>

				{/* Fallback Route */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
