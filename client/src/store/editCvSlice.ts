import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/client";

interface CVEditState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

const initialState: CVEditState = {
	loading: false,
	error: null,
	success: false,
};

export const saveEditToBackend = createAsyncThunk(
	"cv/saveEditToBackend",
	async ({ cvData, token }: { cvData: any; token: string }, thunkAPI) => {
		try {
			if (!cvData || !cvData.id) {
				return thunkAPI.rejectWithValue("Missing CV id in cvData");
			}

			return await apiClient(`/api/cvs/${cvData.id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(cvData),
			});
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error?.message || "Failed to save CV to server",
			);
		}
	},
);

const cvEditSlice = createSlice({
	name: "cvEdit",
	initialState,
	reducers: {
		resetEditState: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(saveEditToBackend.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(saveEditToBackend.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				state.error = null;
			})
			.addCase(saveEditToBackend.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload as string;
			});
	},
});

export const { resetEditState } = cvEditSlice.actions;
export default cvEditSlice.reducer;
