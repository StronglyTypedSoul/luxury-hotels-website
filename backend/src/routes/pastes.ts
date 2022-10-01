import express, { Request, Response } from "express";
import * as db from "../database/db";

const router = express.Router();

// Gets all the pastes
router.get("/", async (req: Request, res: Response) => {
	try {
		const pastes = await db.getAllPastes();
		res.status(200).json(pastes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

export default router;
