import express, { Request, Response } from "express";
import { validate, validatePastesBatch } from "../middleware/validator";
import * as db from "../database/db";

const router = express.Router();

// Get a pastes batch by size and offset
router.get("/", validatePastesBatch(), validate, async (req: Request, res: Response) => {
	const { size, offset } = req.query;
	try {
		const pastes = await db.getPastesBatch(+size, +offset);
		res.status(200).json(pastes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

export default router;
