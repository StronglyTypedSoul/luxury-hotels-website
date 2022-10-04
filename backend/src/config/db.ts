import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}
