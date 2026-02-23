import React, { useEffect, useState } from "react";
import { transformRawToSections } from "../../utils/cvTransformer";

const CVTemplate = ({ data, editable = true, onChange }: any) => {
	const [sections, setSections] = useState<any[]>([]);

	useEffect(() => {
		if (data?.sections) {
			setSections(transformRawToSections(data));
		}
	}, [data]);

	const handleBlur = (
		e: React.FocusEvent<HTMLElement>,
		sectionIndex: number,
		path: string,
	) => {
		const value = e.currentTarget.textContent ?? "";

		setSections((prev) => {
			const next = JSON.parse(JSON.stringify(prev));
			const keys = path.split(".");
			let current = next[sectionIndex].data;

			for (let i = 0; i < keys.length - 1; i++) {
				current = current[keys[i]];
			}

			current[keys[keys.length - 1]] = value;

			if (onChange)
				onChange(
					next.map((s: any) => ({
						type: s.type,
						title: s.title,
						data: s.data,
					})),
				);

			return next;
		});
	};

	return (
		<div className="max-w-3xl mx-auto bg-white p-10 shadow-lg my-10">
			{sections.map((section, sIndex) => {
				switch (section.type) {
					case "header":
						return (
							<div key={sIndex} className="mb-8 border-b pb-6">
								<h1
									contentEditable={editable}
									suppressContentEditableWarning
									onBlur={(e) => handleBlur(e, sIndex, "name")}
									className="text-3xl font-bold"
								>
									{section.data.name}
								</h1>

								<p
									contentEditable={editable}
									suppressContentEditableWarning
									onBlur={(e) => handleBlur(e, sIndex, "title")}
								>
									{section.data.title}
								</p>

								<p>
									{section.data.email} | {section.data.phone} |{" "}
									{section.data.location}
								</p>
							</div>
						);

					case "summary":
						return (
							<div key={sIndex} className="mb-6 border-b">
								<h3>{section.title}</h3>
								<p
									contentEditable={editable}
									suppressContentEditableWarning
									onBlur={(e) => handleBlur(e, sIndex, "")}
								>
									{section.data}
								</p>
							</div>
						);

					case "skills":
					case "education":
					case "projects":
					case "portfolio":
						return (
							<div key={sIndex} className="mb-6">
								<h3 className="text-xl font-semibold border-b mb-2">
									{section.title}
								</h3>
								<ul className="list-disc ml-5">
									{section.data.items?.map((item: any, i: number) => (
										<li
											key={i}
											contentEditable={editable}
											suppressContentEditableWarning
											onBlur={(e) => handleBlur(e, sIndex, `items.${i}`)}
										>
											{typeof item === "string" ? item : JSON.stringify(item)}
										</li>
									))}
								</ul>
							</div>
						);

					case "experience":
						return (
							<div key={sIndex} className="mb-6">
								<h3>{section.title}</h3>
								{section.data.items?.map((exp: any, i: number) => (
									<div key={i}>
										<strong>{exp?.role}</strong> <span>{exp?.duration}</span>
										<p>{exp?.company}</p>
										<ul>
											{exp?.details?.map((d: string, j: number) => (
												<li key={j}>{d}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						);

					default:
						return null;
				}
			})}
		</div>
	);
};

export default CVTemplate;
