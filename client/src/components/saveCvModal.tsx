import React, { useState } from "react";

interface SaveCVModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (data: {
		name: string;
		jobTitle: string;
		company: string;
	}) => void;
}

const SaveCVModal = ({ isOpen, onClose, onConfirm }: SaveCVModalProps) => {
	const [formData, setFormData] = useState({
		name: "",
		jobTitle: "",
		company: "",
	});

	const resetForm = () => {
		setFormData({ name: "", jobTitle: "", company: "" });
	};

	if (!isOpen) return null;

	const isFormValid = formData.name && formData.jobTitle && formData.company;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
				<h2 className="text-xl font-bold mb-4 text-blue-900">Enter Details</h2>

				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Cv Name"
						className="border p-2 rounded focus:outline-blue-600"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
					<input
						type="text"
						placeholder="Job Title"
						className="border p-2 rounded focus:outline-blue-600"
						value={formData.jobTitle}
						onChange={(e) =>
							setFormData({ ...formData, jobTitle: e.target.value })
						}
					/>
					<input
						type="text"
						placeholder="Company Name"
						className="border p-2 rounded focus:outline-blue-600"
						value={formData.company}
						onChange={(e) =>
							setFormData({ ...formData, company: e.target.value })
						}
					/>
				</div>

				<div className="flex justify-end gap-3 mt-6">
					<button
						onClick={() => {
							resetForm();
							onClose();
						}}
						className="text-gray-500 hover:text-gray-700"
					>
						Cancel
					</button>

					{isFormValid && (
						<button
							onClick={() => {
								onConfirm(formData);
								resetForm();
							}}
							className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
						>
							Confirm and Save
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default SaveCVModal;
