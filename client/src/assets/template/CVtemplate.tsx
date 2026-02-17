import React, { useEffect, useState } from "react";
import { transformRawToCVData } from "../../utils/cvTransformer";
import type { CVData, CVTemplateProps } from "../../types/cv";

const CVTemplate: React.FC<CVTemplateProps> = ({
	data,
	editable = true,
	onChange,
}) => {
	const [cv, setCv] = useState<CVData>(() => transformRawToCVData(data));

	useEffect(() => {
		setCv(transformRawToCVData(data));
	}, [data]);

	const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
		const target = e.currentTarget;
		const path = target.getAttribute("data-path");
		if (!path) return;

		const value = target.textContent ?? "";

		setCv((prev) => {
			const next = JSON.parse(JSON.stringify(prev));
			const parts = path.split(".");

			let current: any = next;
			for (let i = 0; i < parts.length - 1; i++) {
				current = current[parts[i]];
			}

			if (current[parts[parts.length - 1]] === value) return prev;

			current[parts[parts.length - 1]] = value;

			if (onChange) onChange(next);

			return next;
		});
	};

	return (
		<div
			id="cv-template"
			className="max-w-3xl mx-auto bg-white rounded-lg p-10 shadow-lg my-10"
		>
			{/* Header / Contact Section */}
			<header className="border-b-2 border-gray-100 pb-6 mb-6">
				<h1
					className="text-4xl font-extrabold text-gray-900 outline-none focus:bg-blue-50 rounded px-1 transition-colors"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="name"
					onBlur={handleBlur}
				>
					{cv.name}
				</h1>
				<h2
					className="text-xl text-blue-600 font-semibold mt-1 outline-none focus:bg-blue-50 rounded px-1"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="title"
					onBlur={handleBlur}
				>
					{cv.title}
				</h2>

				<div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-4 font-medium">
					<span
						className="outline-none focus:underline"
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.email"
						onBlur={handleBlur}
					>
						{cv.contact.email}
					</span>
					<span className="text-gray-300">|</span>
					<span
						className="outline-none focus:underline"
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.phone"
						onBlur={handleBlur}
					>
						{cv.contact.phone}
					</span>
					<span className="text-gray-300">|</span>
					<span
						className="outline-none focus:underline"
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.location"
						onBlur={handleBlur}
					>
						{cv.contact.location}
					</span>
				</div>
			</header>

			{/* Summary Section */}
			<section className="mb-8">
				<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">
					Professional Profile
				</h3>
				<p
					className="text-gray-700 leading-relaxed outline-none focus:bg-blue-50 rounded p-1"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="summary"
					onBlur={handleBlur}
				>
					{cv.summary}
				</p>
			</section>

			{/* Skills Section */}
			<section className="mb-8">
				<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">
					Core Competencies
				</h3>
				<div className="flex flex-wrap gap-2">
					{cv.skills.map((skill, idx) => (
						<span
							key={idx}
							className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-semibold border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300"
							contentEditable={editable}
							suppressContentEditableWarning
							data-path={`skills.${idx}`}
							onBlur={handleBlur}
						>
							{skill}
						</span>
					))}
				</div>
			</section>

			{/* Experience Section */}
			<section className="mb-8">
				<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">
					Work History
				</h3>
				{cv.experience.map((exp, idx) => (
					<div key={idx} className="mb-6 group">
						<div className="flex justify-between items-baseline">
							<h4
								className="text-lg font-bold text-gray-800 outline-none"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`experience.${idx}.role`}
								onBlur={handleBlur}
							>
								{exp.role}
							</h4>
							<span
								className="text-sm text-gray-500 font-mono outline-none"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`experience.${idx}.duration`}
								onBlur={handleBlur}
							>
								{exp.duration}
							</span>
						</div>
						<p
							className="text-blue-700 font-medium mb-2 outline-none"
							contentEditable={editable}
							suppressContentEditableWarning
							data-path={`experience.${idx}.company`}
							onBlur={handleBlur}
						>
							{exp.company}
						</p>
						<ul className="list-disc list-outside ml-5 text-gray-600 space-y-1">
							{exp.details.map((detail, i) => (
								<li
									key={i}
									className="outline-none focus:bg-blue-50 rounded px-1"
									contentEditable={editable}
									suppressContentEditableWarning
									data-path={`experience.${idx}.details.${i}`}
									onBlur={handleBlur}
								>
									{detail}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>

			{/* Education Section */}
			<section>
				<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">
					Academic Background
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{cv.education.map((edu, idx) => (
						<div key={idx} className="border-l-2 border-gray-100 pl-4">
							<p
								className="font-bold text-gray-800 outline-none"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`education.${idx}.school`}
								onBlur={handleBlur}
							>
								{edu.school}
							</p>
							<p
								className="text-sm text-gray-600 outline-none"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`education.${idx}.degree`}
								onBlur={handleBlur}
							>
								{edu.degree}
							</p>
							<p
								className="text-xs text-gray-400 mt-1 outline-none"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`education.${idx}.year`}
								onBlur={handleBlur}
							>
								{edu.year}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default CVTemplate;
