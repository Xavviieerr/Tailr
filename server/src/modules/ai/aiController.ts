import { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const key = process.env.GEMINI_API_KEY;
if (!key) throw new Error("Missing GEMINI_API_KEY");

const ai = new GoogleGenAI({ apiKey: key });
const MODELS = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.0-flash"];

//section schema
const sectionSchema = {
	type: Type.OBJECT,
	properties: {
		type: { type: Type.STRING },
		title: { type: Type.STRING },
		data: { type: Type.TYPE_UNSPECIFIED },
	},
	required: ["type", "title", "data"],
};

const cvSchema = {
	type: Type.OBJECT,
	properties: {
		sections: {
			type: Type.ARRAY,
			items: sectionSchema,
		},
	},
	required: ["sections"],
};

//generate CV controller
export const aiGenerateCv = async (req: Request, res: Response) => {
	const { jobTitle, jobDescription, previousCv, notes, companyInfo } = req.body;

	if (!jobDescription || !previousCv) {
		return res.status(400).json({ error: "Missing required CV data." });
	}

	const seed = crypto.randomUUID();
	const timestamp = new Date().toISOString();

	const prompt = `
You are an expert HR and CV specialist.

CRITICAL:
- Output MUST be valid JSON.
- Output MUST follow the "sections" array schema.
- Each section MUST have type, title, and structured data.
- Every response MUST be unique using the seed provided.

UNIQUENESS SEED: ${seed}
TIMESTAMP: ${timestamp}

--- INPUT DATA ---
JOB TITLE:
${jobTitle}

JOB DESCRIPTION:
${jobDescription}

COMPANY INFO:
${companyInfo || "N/A"}

PREVIOUS CV:
${previousCv}

NOTES:
${notes || "None"}

--- REQUIRED SECTIONS ---
1. header
   - data: { name, title, contact: { email, phone?, location, linkedinUrl?, githubUrl? } }
2. summary
   - data: string
3. skills
   - data: { items: string[] }
4. experience
   - data: { items: [ { role, company, duration, achievements: string[] } ] }
5. education
   - data: { items: [ { school, degree, durationOrYear } ] }

--- OPTIONAL SECTIONS (include if relevant) ---
- projects: { items: [ { name, description, technologies, outcome? } ] }
- certifications: { items: string[] }
- awards: { items: string[] }
- volunteering: { items: [ { role, organization, duration, description? } ] }
- interests: { items: string[] }

Always rewrite sentences, change phrasing, and do not copy previous outputs.
Use synonyms and restructure sentences while keeping meaning intact.

Return JSON ONLY.
`;

	let lastError: unknown;

	for (const model of MODELS) {
		try {
			const response = await ai.models.generateContent({
				model,
				contents: prompt,
				config: {
					temperature: 1.4,
					responseMimeType: "application/json",
					responseSchema: cvSchema,
				},
			});

			if (!response.text) throw new Error("Empty AI response");

			return res.status(200).json({
				modelUsed: model,
				seed,
				cv: JSON.parse(response.text),
			});
		} catch (err) {
			console.error(`Model failed: ${model}`, err);
			lastError = err;
		}
	}

	return res.status(500).json({
		error: "All models failed",
		details: String(lastError),
	});
};
