import Loader from "../../components/Loader/Loader";
import { usePastes } from "../../context/PastesContext";
import "./PastesPage.scss";

const PastesPage: React.FC = () => {
	const { pastes } = usePastes();

	return <div className="pastes-page">{pastes.length > 0 ? pastes.length : <Loader />}</div>;
};

export default PastesPage;
