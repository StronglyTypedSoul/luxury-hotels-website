import User from "../models/user";
import { UTC_OFFSET } from "../constants/timezone";
import { Types } from "mongoose";

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
