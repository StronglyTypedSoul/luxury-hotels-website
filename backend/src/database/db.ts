import mongoose from "mongoose";
import Paste, { IPasteModel } from "../models/paste";

// Connects to the database
export async function connect(): Promise<void> {
	await mongoose.connect(process.env.DATABASE_URL);
}

// Gets all the pastes
export async function getAllPastes(): Promise<IPasteModel[]> {
	const pastes = await Paste.find({});
	return pastes;
}

// Gets the count of all pastes
export async function getAllPastesCount(): Promise<number> {
	const count = await Paste.countDocuments({});
	return count;
}

// Gets the count of all pastes from today
export async function getTodayPastesCount(): Promise<number> {
	const today = new Date();
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
				tag: "$_id",
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
