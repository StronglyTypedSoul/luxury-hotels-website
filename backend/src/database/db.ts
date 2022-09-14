import mongoose from "mongoose";
import Paste, { IPaste, IPasteModel } from "../models/paste";

export async function connect(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}

export async function getAllPastes(): Promise<IPasteModel[]> {}

export async function getAllPastesCount(): Promise<number> {}

export async function getTodayPastesCount(): Promise<number> {}

export async function getTagsByQuantity(): Promise<{ tag: string; count: number }[]> {}

export async function getTopAuthors(): Promise<{ name: string; count: number }[]> {}
