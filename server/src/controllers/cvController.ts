import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const allUserCv = (req: Request, res: Response) => {
	res.status(200).json({ message: "energy is different" });
};

export const createTestCV = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.create({
			data: {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				clerkId: "clerk_test_123",
				updatedAt: new Date(),
			},
		});

		return res.status(201).json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Failed to create user" });
	}
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
