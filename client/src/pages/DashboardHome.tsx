import React, { useState } from "react";
import JobInfoForm from "../components/JobInfoForm";
import CVtemplate from "../assets/template/CVtemplate";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { saveCVToBackend } from "../store/cvSaveSlice";
import { useAuth } from "@clerk/clerk-react";
import SaveCVModal from "../components/saveCvModal";
import { clearCv } from "../store/generateCvSlice";

const DashboardHome = () => {
	const { getToken } = useAuth();
	const { cv } = useSelector((state: RootState) => state.cv);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSaveClick = () => {
		if (!cv?.cv) return alert("No CV to save");
		setIsModalOpen(true);
	};

	const handlePrint = () => {
		window.print();
	};
	const dispatch = useDispatch<AppDispatch>();

	const handleSave = async (formData: {
		name: string;
		jobTitle: string;
		company: string;
	}) => {
		setIsModalOpen(false);

		if (!cv?.cv) {
			return alert("No CV data found to save!");
		}

		const cvData = {
			name: formData.name,
			jobTitle: formData.jobTitle,
			company: formData.company,
			content: cv?.cv,
		};
		try {
			const token = await getToken();
			if (token) {
				await dispatch(saveCVToBackend({ cvData, token })).unwrap();
				alert("CV Saved Successfully!");
				dispatch(clearCv());
			}
		} catch (err) {
			alert(`Save failed: ${err}`);
		}
	};
	return (
		<div className="m-3 gap-3  h-full rounded-md flex">
			<div className="rounded-md shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)] w-1/2 p-2">
				<h1 className="font-bold text-lg text-gray-600">Job Description</h1>
				<div className=" h-full overflow-y-scroll">
					<JobInfoForm />
				</div>
			</div>
			<div className="rounded-md shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)] w-1/2 p-2 h-auto overflow-y-scroll">
				<div className="flex gap-3 justify-evenly border-b  border-blue-900">
					<button
						onClick={handlePrint}
						className="mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
					>
						Download CV
					</button>

					<button
						onClick={handleSaveClick}
						className=" mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
					>
						Save new cv
					</button>

					<SaveCVModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onConfirm={handleSave}
					/>
				</div>
				<div id="cv-template">
					<CVtemplate data={cv?.cv as any} />
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
