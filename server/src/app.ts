import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cvRoutes from "./modules/cv/cvRoutes";
import aiRoutes from "./modules/ai/aiRoutes";
import userRoutes from "./modules/user/userRoute";
import { devAuth } from "./middleware/devAuth";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

export const app = express();

//middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
	app.use(devAuth);
} else {
	app.use(clerkMiddleware());
}

//routes
app.use("/api/cvs", cvRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

export default app;
