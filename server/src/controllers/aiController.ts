import { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getAuth, clerkClient } from "@clerk/express";

dotenv.config();
const key = process.env.GEMINI_API_KEY;

const cvResponseSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    contact: {
      type: Type.OBJECT,
      properties: {
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        location: { type: Type.STRING },
        linkedinUrl: { type: Type.STRING },
        githubUrl: { type: Type.STRING },
      },
      required: ["email", "location"],
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          duration: { type: Type.STRING },
          achievements: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["role", "company", "duration", "achievements"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          school: { type: Type.STRING },
          degree: { type: Type.STRING },
          durationOrYear: { type: Type.STRING },
        },
        required: ["school", "degree", "durationOrYear"],
      },
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    awardsAndCertifications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: [
    "name",
    "title",
    "summary",
    "contact",
    "experience",
    "education",
    "skills",
  ],
};

export const aiGeneratedCv = async (req: Request, res: Response) => {
  const { jobTitle, jobDescription, previousCv, notes, companyInfo } = req.body;
  const { userId }: any = getAuth(req);
  const user = await clerkClient.users.getUser(userId);
  // if (!jobDescription || !previousCv) {
  //   return res.status(400).json({ error: "Missing required CV data." });
  // }

  // const ai = new GoogleGenAI({ apiKey: key });

  // const prompt = `
  //       You are an expert HR and CV specialist. Your task is to revise and tailor the provided CV content to perfectly match the requirements of the specified job description.

  //       Your entire output MUST be a JSON object adhering to the provided schema. The field names must match exactly.

  //       --- INPUT DATA ---
  //       TARGET JOB TITLE: ${jobTitle}
  //       TARGET JOB DESCRIPTION: ${jobDescription}
  //       TARGET COMPANY INFORMATION: ${companyInfo}
  //       CANDIDATE'S PREVIOUS CV CONTENT: ${previousCv}
  //       CANDIDATE NOTES/PREFERENCES: ${notes || "None"}

  //       --- INSTRUCTIONS ---
  //       1. Fill the JSON fields.
  //       2. Specifically, fill the 'contact' object with email, phone, location, LinkedIn URL, and GitHub URL if available in the previous CV content.
  //       3. Tailor the 'summary' and 'experience' 'achievements' arrays to the job description, using keywords and quantifying achievements where possible.
  //       4. Structure all 'experience' and 'education' entries as arrays of objects as defined in the schema.
  //       5. Ensure the output is only the raw JSON string.
  //   `;

  try {
    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: prompt,
    //   config: {
    //     temperature: 0.6,
    //     responseMimeType: "application/json",
    //     responseSchema: cvResponseSchema,
    //   },
    // });

    // const jsonString = response; //get path to data later
    //const tailoredCv = JSON.parse(jsonString);

    res
      .status(200)
      .json({
        jobTitle,
        jobDescription,
        previousCv,
        notes,
        companyInfo,
        user: user,
        userId,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate CV from AI." });
  }
};
