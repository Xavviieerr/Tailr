import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
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

export const allUserCv = (req: Request, res: Response) => {
	res.status(200).json({ message: "energy is different" });
};

// export const getAllCVs = async (req: Request, res: Response) => {
// 	try {
// 		const cvs = await Prisma.User.findMany({
// 			orderBy: {
// 				createdAt: "desc",
// 			},
// 		});

// 		return res.status(200).json(cvs);
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({ error: "Failed to fetch CVs" });
// 	}
// };
