import React, { useEffect, useState } from "react";
import JobInfoForm from "../components/JobInfoForm";
import CVTemplate from "../assets/template/CVtemplate";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { saveCVToBackend } from "../store/cvSaveSlice";
import { useAuth } from "@clerk/clerk-react";
import SaveCVModal from "../components/saveCvModal";
import { clearCv, setCv, updateCv } from "../store/generateCvSlice";
import { saveEditToBackend } from "../store/editCvSlice";
import { toast } from "react-toastify";

const DashboardHome = () => {
	const { getToken } = useAuth();
	const dispatch = useDispatch<AppDispatch>();
	const { cv } = useSelector((state: RootState) => state.cv);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const raw = localStorage.getItem("activeCv");
		if (raw) dispatch(setCv(JSON.parse(raw)));
	}, [dispatch]);

	const handleSaveClick = () => {
		if (!cv) return toast.error("No CV to save");
		setIsModalOpen(true);
	};

	const handleeditsave = async () => {
		if (!cv) return toast.error("No CV to save");
		if (!cv.id) return toast.error("Missing CV id");

		const token = await getToken();
		if (!token) return toast.error("Authentication token missing");

		const cvData = { id: cv.id, sections: cv.sections };
		console.log("Saving CV edit, id:", cv.id);

		try {
			await dispatch(saveEditToBackend({ cvData, token })).unwrap();
			toast.success("CV updated successfully");
			dispatch(clearCv());
		} catch (err: any) {
			toast.error(err?.message || "Failed to save CV edits");
		}
	};

	const handlePrint = () => window.print();

	const handleSave = async (formData: {
		name: string;
		jobTitle: string;
		company: string;
	}) => {
		setIsModalOpen(false);
		if (!cv) return;

		const token = await getToken();
		if (!token) return;

		const cvData = {
			name: formData.name,
			jobTitle: formData.jobTitle,
			company: formData.company,
			content: { sections: cv.sections },
		};

		try {
			await dispatch(saveCVToBackend({ cvData, token })).unwrap();
			toast.success("CV saved successfully");
			dispatch(clearCv());
		} catch (err: any) {
			toast.error(err?.message || "Failed to save CV");
		}
	};

	//saves cv
	const handleTemplateChange = (updatedSections: any) => {
		if (!cv) return;

		dispatch(
			updateCv({
				...cv,
				sections: updatedSections,
			}),
		);
	};

	return (
		<div className="m-3 gap-3 h-full rounded-md flex">
			<div className="rounded-md shadow w-1/2 p-2">
				<h1 className="font-bold text-lg text-gray-600">Job Description</h1>
				<div className="h-full overflow-y-scroll">
					<JobInfoForm />
				</div>
			</div>

			<div className="rounded-md shadow w-1/2 p-2 overflow-y-scroll">
				<div className="flex gap-3 justify-evenly border-b border-blue-900">
					<button
						onClick={handlePrint}
						className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
					>
						Download CV
					</button>

					<button
						onClick={() => {
							if (cv?.id) {
								handleeditsave();
							} else {
								handleSaveClick();
							}
						}}
						className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
					>
						Save CV
					</button>

					<SaveCVModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onConfirm={handleSave}
					/>
				</div>

				<div id="cv-template">
					{cv && <CVTemplate data={cv} onChange={handleTemplateChange} />}
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
