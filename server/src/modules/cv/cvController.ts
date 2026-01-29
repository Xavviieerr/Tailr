import { Request, Response } from "express";
import { AuthRequest } from "../../types/authRequest";
import * as cvService from "./cvService";
import * as userService from "../user/userService";

interface CreateCvBody {
	name: string;
	jobTitle: string;
	company: string;
	content: "JsonNullClass | InputJsonValue";
}

export const createCV = async (
	req: AuthRequest<CreateCvBody>,
	res: Response,
) => {
	const { clerkUserId } = req.auth!;
	const { name, jobTitle, company, content } = req.body;

	if (!name || !jobTitle || !company || !content) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	if (
		typeof content !== "object" ||
		Array.isArray(content) ||
		content === null
	) {
		return res.status(400).json({ error: "Invalid CV content format" });
	}

	const user = await userService.requireUserByClerkId(clerkUserId);

	const cv = await cvService.createCvService({
		userId: user.id,
		name,
		jobTitle,
		company,
		content,
	});

	return res.status(201).json(cv);
};

export const getMyCvs = async (req: AuthRequest, res: Response) => {
	const { clerkUserId } = req.auth!;
	const user = await userService.requireUserByClerkId(clerkUserId);
	const cvs = await cvService.getCvsByUserId(user.id);

	res.json(cvs);
};
