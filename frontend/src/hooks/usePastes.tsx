import { useState, useEffect } from "react";
import { getPastesBatch, PASTES_BATCH_SIZE } from "../api/endpoints";
import IPaste from "../interfaces/paste";

const usePastes = () => {
	const [pastes, setPastes] = useState<IPaste[]>([]);
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMorePastes, setHasMorePastes] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		getPastesBatch(offset)
			.then((newPastes) => {
				setPastes((prevPastes) => [...prevPastes, ...newPastes]);
				setHasMorePastes(Boolean(newPastes.length));
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, [offset]);

	const fetchMorePastes = () => {
		setOffset((prevOffset) => prevOffset + PASTES_BATCH_SIZE);
	};

	return { pastes, isLoading, hasMorePastes, fetchMorePastes };
};

export default usePastes;
