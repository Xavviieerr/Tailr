import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/client";
import type { UserProfile } from "../types/user";

interface CVSaveState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

const initialState: CVSaveState = {
	loading: false,
	error: null,
	success: false,
};

export const saveCVToBackend = createAsyncThunk(
	"cv/saveToBackend",
	async ({ cvData, token }: { cvData: any; token: string }, thunkAPI) => {
		try {
			return await apiClient("/api/cvs/", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(cvData),
			});
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.message || "Failed to save CV to server",
			);
		}
	},
);

const cvSyncSlice = createSlice({
	name: "cvSync",
	initialState,
	reducers: {
		resetSyncState: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(saveCVToBackend.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(saveCVToBackend.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				state.error = null;
			})
			.addCase(saveCVToBackend.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload as string;
			});
	},
});

export const { resetSyncState } = cvSyncSlice.actions;
export default cvSyncSlice.reducer;
