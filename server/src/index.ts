import express from "express";
import dotenv from "dotenv";
import cvRoutes from "./routes/cvRoutes";
import aiRoutes from "./routes/aiRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());

//routes
app.use("/api/cv", cvRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
