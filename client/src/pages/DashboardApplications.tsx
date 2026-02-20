import React, { useEffect } from "react";
import DashboardApplicationItems from "../components/DashboardApplicationItems";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchCVs } from "../store/allCvslice";

const DashboardApplications = () => {
	const { getToken } = useAuth();
	const dispatch = useDispatch<AppDispatch>();
	const { cvs, loading, error } = useSelector((state: RootState) => state.cvs);
	const navigate = useNavigate();

	const handleEdit = (cv: any) => {
		console.log("Editing CV:", cv.id);
		try {
			//get the full info of the single cv
			localStorage.setItem("activeCv", JSON.stringify(cv));
			navigate("/dashboard/home");
		} catch (e) {
			console.error("Failed to set activeCv", e);
		}
	};

	useEffect(() => {
		const loadCv = async () => {
			const token = await getToken();
			if (token) {
				dispatch(fetchCVs({ token }));
			}
		};
		loadCv();
	}, [dispatch, getToken]);

	if (loading) return <Loader />;
	if (error) return <div className="text-red-500">Error: {error}</div>;
	return (
		<div className="p-6 h-auto">
			<div className="h-25 mx-10 rounded-md shadow-md  flex  flex-col p-4 jsutify-evenly">
				<span className="font-bold text-2xl text-gray-600">My Resumes(CV)</span>
				<span className="text-md text-gray-500">
					Below are all your created Curiculum vitae (CV).
				</span>
			</div>
			<div className="maincontent m-10 h-96 p-2 shadow-md overflow-y-scroll">
				<DashboardApplicationItems cvs={cvs} onEdit={handleEdit} />
			</div>
		</div>
	);
};

export default DashboardApplications;
