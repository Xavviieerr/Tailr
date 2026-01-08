import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cvRoutes from "./routes/cvRoutes";
import aiRoutes from "./routes/aiRoutes";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());
//app.use(clerkMiddleware());

//routes
app.use("/api/cv", cvRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
