import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import AuthRedirect from "../components/AuthRedirect";
import DashboardHome from "../pages/DashboardHome";
import DashboardApplications from "../pages/DashboardApplications";
import DashboardProfile from "../pages/DashboardProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        {/* public routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <SignedOut>
              <Navbar />
              <Home />
            </SignedOut>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route index element={<Navigate to={"/dashboard/home"} replace />} />
          <Route
            path="home"
            element={
              <SignedIn>
                <DashboardHome />
              </SignedIn>
            }
          />
          <Route
            path="applications"
            element={
              <SignedIn>
                <DashboardApplications />
              </SignedIn>
            }
          />
          <Route
            path="profile"
            element={
              <SignedIn>
                <DashboardProfile />
              </SignedIn>
            }
          />
        </Route>
        {/* Redirect users who are not signed in */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
