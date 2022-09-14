import express, { Request, Response } from "express";
import * as db from "../database/db";

const router = express.Router();

// Gets all the pastes
router.get("/", async (req: Request, res: Response) => {
	const pastes = await db.getAllPastes();
	res.status(200).json(pastes);
});

// Gets the count of all the pastes
router.get("/all/count", async (req: Request, res: Response) => {
	const count = await db.getAllPastesCount();
	res.status(200).send(String(count));
});

// Gets the count of all the pastes from today
router.get("/today/count", async (req: Request, res: Response) => {
	const count = await db.getTodayPastesCount();
	res.status(200).send(String(count));
});

export default router;
