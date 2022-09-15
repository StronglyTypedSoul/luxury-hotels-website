import "./TotalPastes.scss";
import Loader from "../Loader/Loader";

interface TotalPastesProps {
	totalPastes: number | undefined;
}

const TotalPastes: React.FC<TotalPastesProps> = ({ totalPastes }) => {
	return <div className="total-pastes">{totalPastes || <Loader />}</div>;
};

export default TotalPastes;
