import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserProfile, UserState } from "../types/user";

// The Async Action: Talks to your Backend
export const syncUserWithBackend = createAsyncThunk(
	"user/sync",
	async (
		{ profile, token }: { profile: UserProfile; token: string },
		thunkAPI,
	) => {
		// try {
		// 	// const response = await fetch("https://your-api.com/v1/users", {
		// 	// 	method: "POST",
		// 	// 	headers: {
		// 	// 		"Content-Type": "application/json",
		// 	// 		Authorization: `Bearer ${token}`,
		// 	// 	},
		// 	// 	body: JSON.stringify(profile),
		// 	// });

		// 	// if (!response.ok) throw new Error("Failed to sync user");
		// 	// return await response.json();

		// } catch (error: any) {
		// 	return thunkAPI.rejectWithValue(error.message);
		// }
		console.log(
			"Simulating backend sync with profile:",
			profile,
			"and token:",
			token,
		);
		return profile;
	},
);

const initialState: UserState = {
	data: null,
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(syncUserWithBackend.pending, (state) => {
				state.loading = true;
			})
			.addCase(syncUserWithBackend.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(syncUserWithBackend.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
