import { JsonObject } from "@prisma/client/runtime/client";
import type { CvCreateInput } from "../../generated/prisma/models/Cv";
import { prisma } from "../../lib/prisma";

export const createCv = async (data: CvCreateInput) => {
	return await prisma.cv.create({ data });
};

export const findByUserId = (userId: number) => {
	return prisma.cv.findMany({
		where: {
			userId,
		},
		orderBy: {
			updatedAt: "desc",
		},
	});
};

export const findByIdAndUserId = (cvId: number, userId: number) => {
	return prisma.cv.findFirst({
		where: {
			id: cvId,
			userId,
		},
	});
};

export const updateCvByIdAndUserId = (
	cvId: number,
	userId: number,
	data: JsonObject,
) => {
	return prisma.cv.updateMany({
		where: {
			id: cvId,
			userId: userId,
		},
		data: {
			content: data,
			updatedAt: new Date(),
		},
	});
	//console.log(typeof data, typeof cvId, typeof userId);
};

export const deleteCvByIdAndUserId = (cvId: number, userId: number) => {
	return prisma.cv.deleteMany({
		where: {
			id: cvId,
			userId: userId,
		},
	});
};
