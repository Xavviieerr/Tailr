import { Request, Response } from "express";
import { AuthRequest } from "../../types/authRequest";
import * as cvService from "./cvService";
import * as userService from "../user/userService";

type CvParams = {
	id: number;
};

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

export const getCvById = async (
	req: AuthRequest & Request<CvParams>,
	res: Response,
) => {
	const { clerkUserId } = req.auth!;
	const cvId = Number(req.params.id);

	if (Number.isNaN(cvId)) {
		return res.status(400).json({ error: "Invalid CV id" });
	}

	const user = await userService.requireUserByClerkId(clerkUserId);
	const cv = await cvService.getCvByIdForUser(cvId, user.id);

	if (!cv) {
		return res.status(404).json({ error: "CV not found" });
	}

	return res.json(cv);
};

export const updateCv = async (
	req: AuthRequest & Request<CvParams>,
	res: Response,
) => {
	const cvId = Number(req.params.id);
	const { clerkUserId } = req.auth!;
	console.log(clerkUserId, cvId);
	// Implementation for updating a CV will go here
	res.status(501).json({ error: "Not implemented" });
};
