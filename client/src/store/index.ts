import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cvReducer from "./allCvslice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cvs: cvReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
