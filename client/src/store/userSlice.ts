import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserProfile, UserState } from "../types/user";
import { apiClient } from "../api/client";

export const syncUserWithBackend = createAsyncThunk(
	"user/sync",
	async (
		{ profile, token }: { profile: UserProfile; token: string },
		thunkAPI,
	) => {
		try {
			return await apiClient("/api/user/newUser", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(profile),
			});
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
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
