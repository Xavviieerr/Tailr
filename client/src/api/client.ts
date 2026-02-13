const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = async (
	endpoint: string,
	options: RequestInit = {},
) => {
	const url = `${BASE_URL}${endpoint}`;

	const headers = {
		"Content-Type": "application/json",
		...options.headers,
	};
	const response = await fetch(url, { ...options, headers });

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "Network error" }));
		throw new Error(error.message || "Something went wrong");
	}

	return response.json();
};
