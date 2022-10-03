import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Paste from "../../components/Paste/Paste";
import usePastes from "../../hooks/usePastes";
import "./PastesPage.scss";

const PastesPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [firstRender, setFirstRender] = useState(true);

	const { pastes, isLoading, hasMorePastes, fetchMorePastes, searchPastes } = usePastes();

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
		} else {
			const timer = setTimeout(() => searchPastes(searchTerm), 400);
			return () => clearTimeout(timer);
		}
	}, [searchTerm]);

	const intObserver = useRef<IntersectionObserver | null>(null);
	const lastPostRef = useCallback(
		(pasteElement: HTMLDivElement) => {
			if (isLoading) return;
			if (intObserver.current) intObserver.current.disconnect();
			intObserver.current = new IntersectionObserver((pastes) => {
				if (pastes[0].isIntersecting && hasMorePastes) {
					fetchMorePastes();
				}
			});
			if (pasteElement) intObserver.current.observe(pasteElement);
		},
		[isLoading, hasMorePastes]
	);

	const renderPastes = () => {
		return (
			<div className="pastes-container">
				{pastes.map((paste, index) => {
					if (index === pastes.length - 1) {
						return <Paste ref={lastPostRef} key={paste._id} paste={paste} />;
					} else {
						return <Paste key={paste._id} paste={paste} />;
					}
				})}
			</div>
		);
	};

	return (
		<div className="pastes-page">
			<div className="queries">
				<div className="search">
					<input placeholder="Search by title, content, author" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
				</div>
			</div>
			{isLoading && !pastes.length ? <Loader /> : renderPastes()}
			{isLoading && pastes.length > 0 && (
				<div className="loader">
					<Loader />
				</div>
			)}
			{!isLoading && !hasMorePastes ? pastes.length > 0 ? <>{/* BACK TO TOP */}</> : <>{/* NOT FOUND */}</> : null}
		</div>
	);
};

export default PastesPage;
