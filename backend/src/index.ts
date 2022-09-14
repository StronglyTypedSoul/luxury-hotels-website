import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express, { Request, Response } from "express";
import { json } from "body-parser";
import apiRouter from "./routes/api";
import * as db from "./database/db";

const PORT = +process.env.PORT || 5000;
const app = express();

app.use(json());

// Initialization of database and server
db.connect()
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((err) => console.log(err.message));

// Routes to api endpoints
app.use("/api", apiRouter);

// Serves static files if in production mode
if (process.env.NODE_ENV === "production") {
	const buildDirectory = path.join(__dirname, "../build");

	app.use(express.static(buildDirectory));

	app.get("*", (req: Request, res: Response) => {
		res.sendFile(path.join(buildDirectory, "index.html"));
	});
}
