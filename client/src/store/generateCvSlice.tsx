import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/client";
import { normalizeCv } from "../utils/normalizeCv";
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

const saved = localStorage.getItem("activeCv");

const initialState: GenerateCVState = {
	cv: saved ? JSON.parse(saved) : null,
	loading: false,
	error: null,
};

const slice = createSlice({
	name: "cv",
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
		updateCv: (state, action) => {
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

				const normalized = normalizeCv(action.payload);

				state.cv = normalized;
				localStorage.setItem("activeCv", JSON.stringify(normalized));
			})
			.addCase(generateCV.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearCv, setCv, updateCv } = slice.actions;
export default slice.reducer;
