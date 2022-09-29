import express, { Request, Response } from "express";
import morgan from "morgan";
import pastesRouter from "./pastes";
import * as db from "../database/db";

const router = express.Router();

// Simple requests logger
router.use(morgan(":method :url :status"));

// Routes to pastes endpoints
router.use("/pastes", pastesRouter);

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

export default router;
