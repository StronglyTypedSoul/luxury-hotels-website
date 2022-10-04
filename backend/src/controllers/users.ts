import User from "../models/user";
import { UTC_OFFSET } from "../constants/timezone";
import { Types } from "mongoose";
import { IPasteModel } from "models/paste";
import { getPastesScrapedAfter } from "./pastes";

// Creates a new user
export async function createUser(): Promise<Types.ObjectId> {
	const date = new Date();
	const now = new Date(date.setHours(date.getHours() + UTC_OFFSET));
	const user = new User({ isOnline: true, lastOnline: now });
	await user.save();
	return user._id;
}

// Setting a user's online status and updating his lastOnline date
export async function userConnection(id: string, isOnline: boolean): Promise<void> {
	const date = new Date();
	const now = new Date(date.setHours(date.getHours() + UTC_OFFSET));
	await User.findByIdAndUpdate(id, { isOnline, lastOnline: now }).exec();
}

// Getting all pastes that were scraped after a user's last time online
export async function getNewPastesForUser(id: string): Promise<IPasteModel[]> {
	const user = await User.findById(id).exec();
	const { lastOnline } = user;
	const pastes = await getPastesScrapedAfter(lastOnline);
	return pastes;
}
