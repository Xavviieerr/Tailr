import { CvCreateInput } from "../../../generated/prisma/models/Cv";
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
