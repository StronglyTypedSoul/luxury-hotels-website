import express from "express";
import morgan from "morgan";
import pastesRouter from "./pastes";

const router = express.Router();

// Simple requests logger
router.use(morgan(":method :url :status"));

// Routes to pastes endpoints
router.use("/pastes", pastesRouter);

export default router;
