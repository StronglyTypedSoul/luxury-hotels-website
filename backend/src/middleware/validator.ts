import { Request, Response, NextFunction } from "express";
import { query, ValidationChain, validationResult } from "express-validator";

export function validatePastesBatch(): ValidationChain[] {
	return [query("size").isNumeric(), query("offset").isNumeric(), query("search").isString(), query("tags").isArray().optional()];
}

export const validate = (req: Request, res: Response, next: NextFunction): void => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		next();
	} else {
		res.status(400).json({ errors: errors.array() });
	}
};
