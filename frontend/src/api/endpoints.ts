import axios from "axios";
import { responseHandler } from "./handlers";

export const PASTES_BATCH_SIZE = 20;

export interface IDashboardComponents {
	totalPastes: number;
	todayPastes: number;
	topAuthors: { sum: number; name: string }[];
	tags: { sum: number; name: string }[];
}

export const getDashboardComponents = async () => {
	const response = axios.get("/api/dashboard");
	return responseHandler(response);
};

export const getAllPastes = async () => {
	const response = axios.get("/api/pastes");
	return responseHandler(response);
};

export const getPastesBatch = async (offset: number, searchTerm: string) => {
	const response = axios.get("/api/pastes", {
		params: {
			size: PASTES_BATCH_SIZE,
			offset,
			search: searchTerm,
		},
	});
	return responseHandler(response);
};
