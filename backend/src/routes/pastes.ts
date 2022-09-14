import express, { Request, Response } from "express";

const router = express.Router();

// Gets all the pastes
router.get("/pastes", (req: Request, res: Response) => {
	res.status(200).send("get all pastes");
});

// Gets the count of all the pastes
router.get("/pastes/all/count", (req: Request, res: Response) => {
	res.status(200).send("get count of all pastes");
});

// Gets the count of all the pastes from today
router.get("/pastes/today/count", (req: Request, res: Response) => {
	res.status(200).send("get count of all pastes from today");
});

export default router;
