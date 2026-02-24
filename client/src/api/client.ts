// apiClient.ts
const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = async (
	endpoint: string,
	options: RequestInit = {},
	token?: string | null,
) => {
	const url = `${BASE_URL}${endpoint}`;
	const isFormData = options.body instanceof FormData;

	const headers = {
		...(isFormData ? {} : { "Content-Type": "application/json" }),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
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
