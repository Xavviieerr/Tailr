import type { RawCVResponse } from "../types/cv";

export const transformRawToSections = (raw: RawCVResponse | any) => {
	const sections = Array.isArray(raw?.sections) ? raw.sections : [];

	const safeParse = (value: any) => {
		try {
			return typeof value === "string" ? JSON.parse(value) : value;
		} catch {
			return value;
		}
	};

	return sections.map((section: any) => {
		const parsedData = safeParse(section?.data);

		switch (section?.type) {
			case "header":
				return {
					type: "header",
					title: section.title,
					data: {
						name: parsedData?.name || "",
						title: parsedData?.title || "",
						email: parsedData?.email || "",
						phone: parsedData?.phone || "",
						location:
							typeof parsedData?.contact === "string"
								? parsedData.contact
								: parsedData?.contact?.location || "",
						linkedin:
							parsedData?.linkedinUrl || parsedData?.contact?.linkedin || "",
					},
				};

			case "skills":
				return {
					type: "skills",
					title: section.title,
					data: {
						items: Array.isArray(parsedData?.items) ? parsedData.items : [],
					},
				};

			case "experience":
				const items = Array.isArray(parsedData?.items) ? parsedData.items : [];

				const normalized =
					items.length > 0 && typeof items[0] === "string"
						? [
								{
									company: items[0] || "",
									role: items[1] || "",
									duration: items[2] || "",
									details: items.slice(3) || [],
								},
							]
						: items;

				return {
					type: "experience",
					title: section.title,
					data: { items: normalized },
				};

			case "education":
				return {
					type: "education",
					title: section.title,
					data: {
						items: Array.isArray(parsedData?.items) ? parsedData.items : [],
					},
				};

			case "education":
			case "portfolio":
				return {
					type: section.type,
					title: section.title,
					data: {
						items: Array.isArray(parsedData?.items)
							? parsedData.items
							: typeof parsedData === "string"
								? [parsedData]
								: [],
					},
				};

			default:
				return {
					type: section?.type || "custom",
					title: section?.title || "",
					data: parsedData || {},
				};
		}
	});
};
