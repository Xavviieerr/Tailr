import React, { useEffect } from "react";
import DashboardApplicationItems from "../components/DashboardApplicationItems";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchCVs } from "../store/allCvslice";
import { normalizeCv } from "../utils/normalizeCv";

const DashboardApplications = () => {
	const { getToken } = useAuth();
	const dispatch = useDispatch<AppDispatch>();
	const { cvs, loading, error } = useSelector((state: RootState) => state.cvs);
	const navigate = useNavigate();

	const handleEdit = (cv: any) => {
		const normalized = normalizeCv(cv);
		localStorage.setItem("activeCv", JSON.stringify(normalized));
		navigate("/dashboard/home");
	};

	useEffect(() => {
		const load = async () => {
			const token = await getToken();
			if (token) dispatch(fetchCVs({ token }));
		};
		load();
	}, [dispatch, getToken]);

	if (loading) return <Loader />;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="p-6">
			<div className="h-25 mx-10 rounded-md shadow-md flex flex-col p-4">
				<span className="font-bold text-2xl text-gray-600">My Resumes</span>
			</div>

			<div className="m-10 h-96 p-2 shadow-md overflow-y-scroll">
				<DashboardApplicationItems cvs={cvs} onEdit={handleEdit} />
			</div>
		</div>
	);
};

export default DashboardApplications;
