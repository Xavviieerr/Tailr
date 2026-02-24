import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/client";
import type { CVState } from "../types/cv";

export const fetchCVs = createAsyncThunk(
	"cvs/fetch",
	async ({ token }: { token: string }, thunkAPI) => {
		try {
			return await apiClient("/api/cvs/", {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const initialState: CVState = {
	cvs: [],
	loading: false,
	error: null,
};

const cvSlice = createSlice({
	name: "cvs",
	initialState,
	reducers: {
		clearCVs: (state) => {
			state.cvs = [];
			state.error = null;
		},
		addCV: (state, action) => {
			state.cvs.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCVs.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCVs.fulfilled, (state, action) => {
				state.loading = false;
				state.cvs = action.payload;
			})
			.addCase(fetchCVs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { addCV, clearCVs } = cvSlice.actions;
export default cvSlice.reducer;
