import Paste, { IPasteModel } from "../models/paste";
import { UTC_OFFSET } from "../constants/timezone";

// Gets all the pastes
export async function getAllPastes(): Promise<IPasteModel[]> {
	const pastes = await Paste.find({});
	return pastes;
}

// Gets a pastes batch by size, offset and a search term
export async function getPastesBatch(size: number, offset: number, search: string, tags: string[]): Promise<IPasteModel[]> {
	const searchRegex = new RegExp(search, "i");
	const findQuery = { $or: [{ title: searchRegex }, { content: searchRegex }, { author: searchRegex }] };
	if (tags.length > 0) findQuery["tags"] = { $in: tags };
	const pastes = await Paste.find(findQuery).sort({ date: -1 }).skip(offset).limit(size).exec();
	return pastes;
}

// Gets all the pastes that were scraped after a given time
export async function getPastesScrapedAfter(time: Date, compact: boolean): Promise<IPasteModel[]> {
	const projection = compact ? { title: 1, author: 1, tags: 1 } : {};
	const pastes = await Paste.find({ scrapedAt: { $gte: time } }, projection).exec();
	return pastes;
}

// Gets all the tags
export async function getAllTags(): Promise<string[]> {
	let tags = await Paste.aggregate([{ $unwind: { path: "$tags" } }, { $group: { _id: "$tags" } }]).exec();
	tags = tags.map((tag) => tag._id);
	return tags;
}

// Gets the count of all pastes
export async function getAllPastesCount(): Promise<number> {
	const count = await Paste.countDocuments({}).exec();
	return count;
}

// Gets the count of all pastes from today
export async function getTodayPastesCount(): Promise<number> {
	const date = new Date();
	const today = new Date(date.setHours(date.getHours() + UTC_OFFSET));
	today.setUTCHours(0, 0, 0, 0);
	const count = await Paste.countDocuments({ date: { $gte: today } }).exec();
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
	]).exec();
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
	]).exec();
	return authors;
}
