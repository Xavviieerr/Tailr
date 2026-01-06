import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/DashboardHome";
import DashboardApplications from "../pages/DashboardApplications";
import DashboardProfile from "../pages/DashboardProfile";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* ===================== */}
				{/* Public Auth Routes */}
				{/* ===================== */}

				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<Signup />} />
				{/* Todo: Fix sign up route another day to sure bug not from me. */}

				{/* ===================== */}
				{/* Root Redirect */}
				{/* ===================== */}
				<Route
					path="/"
					element={
						<>
							<SignedIn>
								<Navigate to="/dashboard" replace />
							</SignedIn>

							<SignedOut>
								<Navbar />
								<Home />
							</SignedOut>

							{/* <SignedOut>
								<Navigate to="/login" replace />
							</SignedOut> */}
						</>
					}
				/>
				{/* ===================== */}
				{/* Protected Dashboard */}
				{/* ===================== */}
				<Route
					path="/dashboard"
					element={
						<>
							<SignedIn>
								<Dashboard />
							</SignedIn>

							<SignedOut>
								{/* <RedirectToSignIn redirectUrl="/login" /> */}
								<Navigate to="/login" replace />
							</SignedOut>
						</>
					}
				>
					<Route index element={<Navigate to="/dashboard/home" replace />} />
					<Route path="home" element={<DashboardHome />} />
					<Route path="applications" element={<DashboardApplications />} />
					<Route path="profile" element={<DashboardProfile />} />
				</Route>
				{/* Fallback Route */}
				{/* ===================== */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
