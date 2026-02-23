export const transformCVToSchema = (rawData: any[]) => {
	const sections = rawData.map((section) => {
		const { type, title, data } = section;

		switch (type) {
			case "header":
				return {
					type,
					title,
					data: {
						name: data?.name || "",
						title: data?.title || "",
						phone: data?.phone || "",
						email: data?.email || "",
						location: data?.location || "",
						linkedinUrl: data?.linkedin || "",
					},
				};

			case "experience":
				return {
					type,
					title,
					data: {
						items: data?.items || [],
						company: data?.items?.[0]?.company || "",
					},
				};

			case "summary":
				return {
					type,
					title,
					data: typeof data === "string" ? data : data?.content || "",
				};

			// Handles skills, education, projects, awards, etc.
			default:
				return {
					type,
					title,
					data: {
						items: Array.isArray(data?.items) ? data.items : [],
					},
				};
		}
	});

	return {
		cv: {
			sections: sections,
		},
	};
};
