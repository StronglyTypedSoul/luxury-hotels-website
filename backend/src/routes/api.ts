import express, { Request, Response } from "express";
import morgan from "morgan";

const router = express.Router();

router.use(morgan(":method :url :status"));

router.get("/", (req: Request, res: Response) => {
	res.status(200).send("api");
});

export default router;
