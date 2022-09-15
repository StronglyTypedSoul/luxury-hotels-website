import express, { Request, Response } from "express";
import * as db from "../database/db";

const router = express.Router();

// Gets all the pastes
router.get("/", async (req: Request, res: Response) => {
	db.getAllPastes()
		.then((pastes) => res.status(200).json(pastes))
		.catch((err) => res.status(500).send(err.message));
});

export default router;
