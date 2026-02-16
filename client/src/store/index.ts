import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cvReducer from "./allCvslice";
import generateCvReducer from "./generateCvSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cvs: cvReducer,
		cv: generateCvReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
