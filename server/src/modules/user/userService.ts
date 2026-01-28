// User Service

// Ensure user exists (sync)
// Retrieve user profile
// Expose plan & limits
// Act as gatekeeper for other modules

import * as userRepo from "./userRepository";

interface NewUserInput {
	clerkUserId: string;
	email: string;
	firstName: string;
	lastName: string;
}

export const syncUser = async ({
	clerkUserId,
	email,
	firstName,
	lastName,
}: NewUserInput) => {
	const existingUser = await userRepo.findByClerkId(clerkUserId);

	if (existingUser) {
		return existingUser;
	}

	// First-time user
	return userRepo.createUser({
		clerkId: clerkUserId,
		email,
		firstName,
		lastName,
		updatedAt: new Date(),
	});
};

export const getUserByClerkId = async (clerkUserId: string) => {
	const user = await userRepo.findByClerkId(clerkUserId);

	if (!user) {
		throw new Error("User not found");
	}

	return user;
};
