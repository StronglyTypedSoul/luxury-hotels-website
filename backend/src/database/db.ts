import mongoose from "mongoose";
import Paste, { IPasteModel } from "../models/paste";
import { UTC_OFFSET } from "../constants/timezone";

// Connects to the database
export async function connect(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}

// Gets all the pastes
export async function getAllPastes(): Promise<IPasteModel[]> {
	const pastes = await Paste.find({});
	return pastes;
}

// Gets a pastes batch by size, offset and a search term
export async function getPastesBatch(size: number, offset: number, search: string): Promise<IPasteModel[]> {
	const searchRegex = new RegExp(search, "i");
	const findQuery = search ? { $or: [{ title: searchRegex }, { content: searchRegex }, { author: searchRegex }] } : {};
	const pastes = await Paste.find(findQuery).sort({ date: -1 }).skip(offset).limit(size);
	return pastes;
}

// Gets the count of all pastes
export async function getAllPastesCount(): Promise<number> {
	const count = await Paste.countDocuments({});
	return count;
}

// Gets the count of all pastes from today
export async function getTodayPastesCount(): Promise<number> {
	const date = new Date();
	const today = new Date(date.setHours(date.getHours() + UTC_OFFSET));
	today.setUTCHours(0, 0, 0, 0);
	const count = await Paste.countDocuments({ date: { $gte: today } });
	return count;
}

// Gets all the tags and the amount of pastes which in they appear
export async function getTagsByQuantity(): Promise<{ sum: number; tag: string }[]> {
	const tags = await Paste.aggregate([
		{ $project: { tags: 1 } },
		{ $unwind: { path: "$tags" } },
		{
			$group: {
				_id: "$tags",
				sum: { $sum: 1 },
			},
		},
		{
			$project: {
				_id: 0,
				name: "$_id",
				sum: 1,
			},
		},
	]);
	return tags;
}

// Gets 5 authors with the most pastes
export async function getTopAuthors(): Promise<{ sum: number; name: string }[]> {
	const authors = await Paste.aggregate([
		{
			$project: {
				author: 1,
			},
		},
		{
			$group: {
				_id: "$author",
				sum: {
					$sum: 1,
				},
			},
		},
		{
			$project: {
				_id: 0,
				name: "$_id",
				sum: 1,
			},
		},
		{
			$sort: {
				sum: -1,
			},
		},
		{
			$limit: 5,
		},
	]);
	return authors;
}
