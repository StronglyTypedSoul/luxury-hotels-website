import Loader from "../../components/Loader/Loader";
import Paste from "../../components/Paste/Paste";
import { usePastes } from "../../context/PastesContext";
import "./PastesPage.scss";

const PastesPage: React.FC = () => {
	const { pastes } = usePastes();

	const renderPastes = () => {
		return pastes.map((paste) => <Paste key={paste._id} paste={paste} />);
	};

	return <div className="pastes-page">{pastes.length > 0 ? renderPastes() : <Loader />}</div>;
};

export default PastesPage;
