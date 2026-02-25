import "dotenv/config";
import path from "path";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

let PrismaClientCtor: any;

const tryPaths = [
	// compiled build location
	path.join(process.cwd(), "dist", "src", "generated", "prisma", "client"),
	// source location (ts-node / dev)
	path.join(process.cwd(), "src", "generated", "prisma", "client"),
	// older possible locations
	path.join(process.cwd(), "dist", "generated", "prisma", "client"),
	path.join(process.cwd(), "generated", "prisma", "client"),
];
for (const p of tryPaths) {
	try {
		PrismaClientCtor = require(p).PrismaClient;
		break;
	} catch (err) {
		// ignore and try next
	}
}
if (!PrismaClientCtor) {
	PrismaClientCtor = require("@prisma/client").PrismaClient;
}

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClientCtor({ adapter });

export { prisma };
