import { useState, useEffect } from "react";
import { getPastesBatch, PASTES_BATCH_SIZE } from "../api/endpoints";
import { IPaste } from "../interfaces/paste";

const usePastes = () => {
	const [pastes, setPastes] = useState<IPaste[]>([]);
	const [offset, setOffset] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMorePastes, setHasMorePastes] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getPastesBatch(offset, searchTerm, tags)
			.then((newPastes) => {
				setPastes((prevPastes) => [...prevPastes, ...newPastes]);
				setHasMorePastes(newPastes.length >= PASTES_BATCH_SIZE);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, [offset, searchTerm, tags]);

	const fetchMorePastes = () => {
		setOffset((prevOffset) => prevOffset + PASTES_BATCH_SIZE);
	};

	const searchPastes = (term: string) => {
		setPastes([]);
		setSearchTerm(term);
		setOffset(0);
	};

	const filterPastes = (tags: string[]) => {
		setPastes([]);
		setTags(tags);
		setOffset(0);
	};

	return { pastes, isLoading, hasMorePastes, fetchMorePastes, searchPastes, filterPastes };
};

export default usePastes;
