import * as userRepo from "../user/userRepository";
import * as cvRepo from "./cvRepository";
import { updateCv } from "./cvController";
import type { CvCreateInput } from "../../../generated/prisma/models";
import { JsonObject } from "@prisma/client/runtime/client";

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

export const getCvByIdForUser = async (cvId: number, userId: number) => {
	return cvRepo.findByIdAndUserId(cvId, userId);
};

export const updateCvByIdForUser = async (
	cvId: number,
	userId: number,
	data: JsonObject,
) => {
	return cvRepo.updateCvByIdAndUserId(cvId, userId, data);
};

export const deleteCvByIdForUser = async (cvId: number, userId: number) => {
	return cvRepo.deleteCvByIdAndUserId(cvId, userId);
};
