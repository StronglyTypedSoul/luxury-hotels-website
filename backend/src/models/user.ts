import { Schema, model } from "mongoose";

export interface IUser {
	isOnline: boolean;
	lastOnline: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
	{
		isOnline: { type: Boolean, required: true },
		lastOnline: { type: Date, required: true },
	},
	{ collection: "users" }
);

export default model<IUserModel>("User", UserSchema);
