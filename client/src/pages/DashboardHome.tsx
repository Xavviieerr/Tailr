import React from "react";
import JobInfoForm from "../components/JobInfoForm";
import CVtemplate from "../assets/template/CVtemplate";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const DashboardHome = () => {
	const { cv } = useSelector((state: RootState) => state.cv);
	console.log("CV in DashboardHome:", cv?.cv);
	const handlePrint = () => {
		window.print();
	};

	const handleRedo = () => {
		alert("redo");
	};

	const handleSave = () => {
		alert("Save");
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
						onClick={handleRedo}
						className=" mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
					>
						Redo
					</button>
					<button
						onClick={handleSave}
						className=" mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
					>
						Save
					</button>
				</div>
				<CVtemplate data={cv?.cv as any} />
			</div>
		</div>
	);
};

export default DashboardHome;
