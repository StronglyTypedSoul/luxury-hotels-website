import express, { Request, Response } from "express";
import morgan from "morgan";
import pastesRouter from "./pastes";
import * as db from "../database/db";

const router = express.Router();

// Simple requests logger
router.use(morgan(":method :url :status"));

// Routes to pastes endpoints
router.use("/pastes", pastesRouter);

// Gets all the tags and the amount of pastes which in they appear
router.get("/tags", (req: Request, res: Response) => {
	db.getTagsByQuantity()
		.then((tags) => res.status(200).json(tags))
		.catch((err) => res.status(500).send(err.message));
});

// Gets the 5 most active authors
router.get("/authors/top", (req: Request, res: Response) => {
	db.getTopAuthors()
		.then((authors) => res.status(200).json(authors))
		.catch((err) => res.status(500).send(err.message));
});

export default router;
