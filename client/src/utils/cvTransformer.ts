import type { CVData, RawCVResponse } from "../types/cv";

export const transformRawToCVData = (raw: RawCVResponse | any): CVData => {
	const sections = Array.isArray(raw?.sections) ? raw.sections : [];
	const findSection = (type: string) =>
		sections.find((s: any) => s?.type === type);

	const safeParse = (jsonString: any, fallback: any) => {
		try {
			return typeof jsonString === "string"
				? JSON.parse(jsonString)
				: jsonString;
		} catch (e) {
			console.error("Failed to parse section data", e);
			return fallback;
		}
	};

	const header = findSection("header")?.data || {};
	const contact = safeParse(header.contact, {});
	const skillsData = safeParse(findSection("skills")?.data, { items: [] });
	const expData = safeParse(findSection("experience")?.data, { items: [] });
	const eduData = safeParse(findSection("education")?.data, { items: [] });

	return {
		name: header?.name || "Untitled",
		title: header?.title || "",
		summary: findSection("summary")?.data || "",
		contact: {
			email: contact?.email || "",
			phone: contact?.phone || "",
			location: contact?.location || "",
		},
		skills: skillsData?.items || [],
		experience: (expData?.items || []).map((item: any) => ({
			role: item.role || "",
			company: item.company || "",
			duration: item.duration || "",
			details: item.achievements || [],
		})),
		education: (eduData?.items || []).map((item: any) => ({
			school: item.school || "",
			degree: item.degree || "",
			year: item.durationOrYear || "",
		})),
	};
};
