import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/client";
import type { GenerateCVState, JobInfo } from "../types/cv";

export const generateCV = createAsyncThunk(
	"cv/generate",
	async (
		{ token, jobInfo }: { token: string; jobInfo: JobInfo | FormData },
		thunkAPI,
	) => {
		try {
			if (jobInfo instanceof FormData) {
				return await apiClient("/api/ai/generate", {
					method: "POST",
					headers: { Authorization: `Bearer ${token}` },
					body: jobInfo,
				});
			}
			return await apiClient("/api/ai/generate", {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: JSON.stringify(jobInfo),
			});
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
const savedCv = localStorage.getItem("activeCv");

const initialState: GenerateCVState = {
	cv: savedCv ? JSON.parse(savedCv) : null,
	loading: false,
	error: null,
};

const generateCvSlice = createSlice({
	name: "ai",
	initialState,
	reducers: {
		clearCv: (state) => {
			state.cv = null;
			localStorage.removeItem("activeCv");
		},
		setCv: (state, action) => {
			state.cv = action.payload;
			localStorage.setItem("activeCv", JSON.stringify(action.payload));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(generateCV.pending, (state) => {
				state.loading = true;
			})
			.addCase(generateCV.fulfilled, (state, action) => {
				state.loading = false;
				state.cv = action.payload;
				localStorage.setItem("activeCv", JSON.stringify(action.payload));
			})
			.addCase(generateCV.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearCv, setCv } = generateCvSlice.actions;
export default generateCvSlice.reducer;
