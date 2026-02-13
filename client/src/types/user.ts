export interface UserProfile {
	firstName: string;
	lastName: string;
	email: string;
}

export interface UserState {
	data: UserProfile | null;
	loading: boolean;
	error: string | null;
}
