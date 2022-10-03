import { useState, useEffect } from "react";
import { getPastesBatch, PASTES_BATCH_SIZE } from "../api/endpoints";
import IPaste from "../interfaces/paste";

const usePastes = () => {
	const [pastes, setPastes] = useState<IPaste[]>([]);
	const [offset, setOffset] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [hasMorePastes, setHasMorePastes] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getPastesBatch(offset, searchTerm)
			.then((newPastes) => {
				setPastes((prevPastes) => [...prevPastes, ...newPastes]);
				setHasMorePastes(Boolean(newPastes.length));
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, [offset, searchTerm]);

	const fetchMorePastes = () => {
		setOffset((prevOffset) => prevOffset + PASTES_BATCH_SIZE);
	};

	const searchPastes = (term: string) => {
		setPastes([]);
		setSearchTerm(term);
		setOffset(0);
	};

	return { pastes, isLoading, hasMorePastes, fetchMorePastes, searchPastes };
};

export default usePastes;
