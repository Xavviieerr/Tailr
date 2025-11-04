import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.GEMINI_API_KEY;

export const aiGeneratedCv = async (req: Request, res: Response) => {
  const ai = new GoogleGenAI({ apiKey: key });

  try {
    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: "Write a short, four-line poem about Node.js and AI.",
    // });
    res.status(200).json("response");
  } catch (error) {
    console.log(error);
  }
};
