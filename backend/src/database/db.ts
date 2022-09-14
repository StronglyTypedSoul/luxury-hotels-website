import mongoose from "mongoose";

export async function connect(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}

export async function getAllPastes(): Promise<Paste[]> {}

export async function getAllPastesCount(): Promise<number> {}

export async function getTodayPastesCount(): Promise<number> {}

export async function getTagsByQuantity(): Promise<{ tag: string; count: number }[]> {}

export async function getTopAuthors(): Promise<{ name: string; count: number }[]> {}
