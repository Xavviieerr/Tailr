// scripts/getSessionToken.ts
import "dotenv/config";
import { clerkClient } from "@clerk/clerk-sdk-node";

async function run() {
	const users = await clerkClient.users.getUserList({ limit: 1 });
	const user = users.data?.[0];

	if (!user) throw new Error("No users found");

	const sessions = await clerkClient.sessions.getSessionList({
		userId: user.id,
	});
	if (!sessions.data?.length) {
		throw new Error("User has no active sessions. Log in once via frontend.");
	}
	const session = sessions.data?.[0];

	if (!session) throw new Error("No sessions found");

	const token = await clerkClient.sessions.getToken(session.id, "backend");

	console.log(token.jwt);
}

run();
