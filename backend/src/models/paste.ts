import { Schema, model } from "mongoose";

export interface IPaste {
	title: string;
	content: string;
	author: string;
	date: Date;
	tags: string[];
	scrapedAt: Date;
}

export interface IPasteModel extends IPaste, Document {}

const PasteSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: true },
		date: { type: Date, required: true },
		tags: { type: Array<String>, required: true },
		scrapedAt: { type: Date, required: true },
	},
	{ collection: "pastes" }
);

export default model<IPasteModel>("Paste", PasteSchema);
