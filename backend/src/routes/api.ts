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
	const tags = db.getTagsByQuantity();
	res.status(200).json(tags);
});

// Gets the 5 most active authors
router.get("/authors/top", (req: Request, res: Response) => {
	const authors = db.getTopAuthors();
	res.status(200).json(authors);
});

export default router;
