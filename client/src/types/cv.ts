export interface CVState {
	cvs: any[];
	loading: boolean;
	error: string | null;
}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
	[key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface GenerateCVState {
	cv: JSONObject | null;
	loading: boolean;
	error: string | null;
}

export interface JobInfo {
	title: string;
	description: string;
	company: string;
	notes?: string;
	file?: File | null;
}

export interface CVData {
	name: string;
	title: string;
	summary: string;
	contact: {
		email: string;
		phone: string;
		location: string;
		linkedin: string;
	};
	skills: string[];
	experience: {
		role: string;
		company: string;
		duration: string;
		details: string[];
	}[];
	education: {
		school: string;
		degree: string;
		year: string;
	}[];
}
export interface RawSection {
	type:
		| "header"
		| "summary"
		| "skills"
		| "experience"
		| "education"
		| "projects";
	title: string;
	data: any;
}

export interface RawCVResponse {
	sections: RawSection[];
}

export interface CVTemplateProps {
	data: RawCVResponse;
	editable?: boolean;
	onChange?: (updated: CVData) => void;
}
