import express, { Request, Response } from "express";
import morgan from "morgan";
import pastesRouter from "./pastes";

const router = express.Router();

// Simple requests logger
router.use(morgan(":method :url :status"));

// Routes to pastes endpoints
router.use("/pastes", pastesRouter);

// Gets all the tags and the amount of pastes which in they appear
router.get("/tags", (req: Request, res: Response) => {
	res.status(200).send("get all tags quantified");
});

// Gets the 5 most active authors
router.get("/authors/top", (req: Request, res: Response) => {
	res.status(200).send("get 5 most popular authors");
});

export default router;
