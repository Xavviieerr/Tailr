export interface UserProfile {
	firstname: string;
	lastname: string;
	email: string;
}

export interface UserState {
	data: UserProfile | null;
	loading: boolean;
	error: string | null;
}
