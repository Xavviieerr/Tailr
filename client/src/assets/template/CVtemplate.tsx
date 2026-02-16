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

	const handleInput = (e: React.FormEvent<HTMLElement>) => {
		const target = e.currentTarget;
		const path = target.getAttribute("data-path");
		if (!path) return;

		const value = target.textContent ?? "";

		setCv((prev) => {
			const next = { ...prev };
			const parts = path.split(".");

			let current: any = next;
			for (let i = 0; i < parts.length - 1; i++) {
				current = current[parts[i]];
			}
			current[parts[parts.length - 1]] = value;

			return next;
		});
	};

	return (
		<div id="cv-template" className="max-w-3xl mx-auto bg-white rounded-lg p-8">
			{/* Header */}
			<header className="border-b border-gray-300 pb-4 mb-4">
				<h1
					className="text-3xl font-bold text-gray-800"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="name"
					onInput={handleInput}
				>
					{cv.name}
				</h1>
				<h2
					className="text-lg text-blue-600 font-medium"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="title"
					onInput={handleInput}
				>
					{cv.title}
				</h2>
				<p className="text-sm text-gray-500 mt-2">
					<span
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.email"
						onInput={handleInput}
					>
						{cv.contact.email}
					</span>{" "}
					|{" "}
					<span
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.phone"
						onInput={handleInput}
					>
						{cv.contact.phone}
					</span>{" "}
					|{" "}
					<span
						contentEditable={editable}
						suppressContentEditableWarning
						data-path="contact.location"
						onInput={handleInput}
					>
						{cv.contact.location}
					</span>
				</p>
			</header>

			{/* Summary */}
			<section className="mb-6">
				<h3 className="text-xl font-semibold text-gray-700 mb-2">
					Profile Summary
				</h3>
				<p
					className="text-gray-600 leading-relaxed"
					contentEditable={editable}
					suppressContentEditableWarning
					data-path="summary"
					onInput={handleInput}
				>
					{cv.summary}
				</p>
			</section>

			{/* Skills */}
			<section className="mb-6">
				<h3 className="text-xl font-semibold text-gray-700 mb-2">Skills</h3>
				<ul className="flex flex-wrap gap-2">
					{cv.skills.map((skill, idx) => (
						<li
							key={idx}
							className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
							contentEditable={editable}
							suppressContentEditableWarning
							data-path={`skills.${idx}`}
							onInput={handleInput}
						>
							{skill}
						</li>
					))}
				</ul>
			</section>

			{/* Experience */}
			<section className="mb-6">
				<h3 className="text-xl font-semibold text-gray-700 mb-2">Experience</h3>
				{cv.experience.map((exp, idx) => (
					<div key={idx} className="mb-4">
						<h4
							className="text-lg font-semibold text-gray-800"
							contentEditable={editable}
							suppressContentEditableWarning
							data-path={`experience.${idx}.role`}
							onInput={handleInput}
						>
							{exp.role}
						</h4>
						<p className="text-sm text-gray-500">
							<span
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`experience.${idx}.company`}
								onInput={handleInput}
							>
								{exp.company}
							</span>{" "}
							•{" "}
							<span
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`experience.${idx}.duration`}
								onInput={handleInput}
							>
								{exp.duration}
							</span>
						</p>
						<ul className="list-disc list-inside text-gray-600 mt-2">
							{exp.details.map((d, i) => (
								<li
									key={i}
									contentEditable={editable}
									suppressContentEditableWarning
									data-path={`experience.${idx}.details.${i}`}
									onInput={handleInput}
								>
									{d}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>

			{/* Education */}
			<section>
				<h3 className="text-xl font-semibold text-gray-700 mb-2 flex flex-wrap gap-2">
					Education
				</h3>
				<div className="flex flex-wrap gap-5">
					{cv.education.map((edu, idx) => (
						<div key={idx} className="mb-2">
							<p
								className="font-medium text-gray-800"
								contentEditable={editable}
								suppressContentEditableWarning
								data-path={`education.${idx}.school`}
								onInput={handleInput}
							>
								{edu.school}
							</p>
							<p className="text-sm text-gray-500">
								<span
									contentEditable={editable}
									suppressContentEditableWarning
									data-path={`education.${idx}.degree`}
									onInput={handleInput}
								>
									{edu.degree}
								</span>{" "}
								•{" "}
								<span
									contentEditable={editable}
									suppressContentEditableWarning
									data-path={`education.${idx}.year`}
									onInput={handleInput}
								>
									{edu.year}
								</span>
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default CVTemplate;
