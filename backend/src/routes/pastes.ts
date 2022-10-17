import express, { Request, Response } from "express";
import { validate, validatePastesBatch } from "../middleware/validator";
import * as db from "../controllers/pastes";

const router = express.Router();

// Get a pastes batch by size and offset
router.get("/", validatePastesBatch(), validate, async (req: Request, res: Response) => {
	const { size, offset, search } = req.query;
	const tags = (req.query.tags as string[]) || [];
	try {
		const pastes = await db.getPastesBatch(+size, +offset, String(search), tags);
		res.status(200).json(pastes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

// Gets all the dashboard components: all pastes count, today's pastes count, top authors and tags
router.get("/dashboard", async (req: Request, res: Response) => {
	const dashboard = {};
	try {
		dashboard["totalPastes"] = await db.getAllPastesCount();
		dashboard["todayPastes"] = await db.getTodayPastesCount();
		dashboard["topAuthors"] = await db.getTopAuthors();
		dashboard["tags"] = await db.getTagsByQuantity();
		res.status(200).json(dashboard);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

// Gets all the tags
router.get("/tags", async (req: Request, res: Response) => {
	try {
		const tags = await db.getAllTags();
		res.status(200).json(tags);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

export default router;
