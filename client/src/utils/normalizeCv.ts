export const normalizeCv = (input: any) => {
	if (!input) return null;

	// AI response
	if (input?.cv?.sections) {
		return {
			source: "ai",
			sections: input.cv.sections,
		};
	}

	// Saved CV
	if (input?.content?.sections) {
		return {
			id: input.id,
			source: "saved",
			sections: input.content.sections,
			meta: {
				name: input.name,
				jobTitle: input.jobTitle,
				company: input.company,
			},
		};
	}

	if (input?.sections) return input;

	return null;
};
