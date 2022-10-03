import { useCallback, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import Paste from "../../components/Paste/Paste";
import usePastes from "../../hooks/usePastes";
import "./PastesPage.scss";

const PastesPage: React.FC = () => {
	const { pastes, isLoading, hasMorePastes, fetchMorePastes } = usePastes();

	const intObserver = useRef<IntersectionObserver | null>(null);
	const lastPostRef = useCallback(
		(paste: HTMLDivElement) => {
			if (isLoading) return;

			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((pastes) => {
				if (pastes[0].isIntersecting && hasMorePastes) {
					fetchMorePastes();
					paste.scrollIntoView({ behavior: "smooth" });
				}
			});

			if (paste) intObserver.current.observe(paste);
		},
		[isLoading, hasMorePastes]
	);

	const renderPastes = () => {
		return pastes.map((paste, index) => {
			if (index === pastes.length - 1) {
				return <Paste ref={lastPostRef} key={paste._id} paste={paste} />;
			} else {
				return <Paste key={paste._id} paste={paste} />;
			}
		});
	};

	return (
		<div className="pastes-page">
			{isLoading && !pastes.length ? <Loader /> : renderPastes()}
			{isLoading && pastes.length && (
				<div className="loader">
					<Loader />
				</div>
			)}
			{!isLoading && !hasMorePastes ? pastes.length ? <>{/* BACK TO TOP */}</> : <>{/* NOT FOUND */}</> : null}
		</div>
	);
};

export default PastesPage;
