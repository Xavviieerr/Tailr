import * as userRepo from "../user/userRepository";
import * as cvRepo from "./cvRepository";

interface CreateCv {
	userId: number;
	name: string;
	jobTitle: string;
	company: string;
	content: "JsonNullClass | InputJsonValue";
}

export const createCvService = async ({
	userId,
	name,
	jobTitle,
	company,
	content,
}: CreateCv) => {
	return cvRepo.createCv({
		User: {
			connect: {
				id: userId,
			},
		}, //cv relation to user enforced by prisma schema
		name,
		jobTitle,
		company,
		content,
		updatedAt: new Date(),
	});
};

export const getCvsByUserId = async (userId: number) => {
	return cvRepo.findByUserId(userId);
};
