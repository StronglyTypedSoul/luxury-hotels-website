import express, { Request, Response } from "express";
import * as db from "../database/db";

const router = express.Router();

// Gets all the pastes
router.get("/", async (req: Request, res: Response) => {
	db.getAllPastes()
		.then((pastes) => res.status(200).json(pastes))
		.catch((err) => res.status(500).send(err.message));
});

// Gets the count of all the pastes
router.get("/all/count", async (req: Request, res: Response) => {
	db.getAllPastesCount()
		.then((count) => res.status(200).send(String(count)))
		.catch((err) => res.status(500).send(err.message));
});

// Gets the count of all the pastes from today
router.get("/today/count", async (req: Request, res: Response) => {
	db.getTodayPastesCount()
		.then((count) => res.status(200).send(String(count)))
		.catch((err) => res.status(500).send(err.message));
});

export default router;
