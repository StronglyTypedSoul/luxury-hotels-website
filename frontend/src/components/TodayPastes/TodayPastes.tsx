import "./TodayPastes.scss";
import Loader from "../Loader/Loader";

interface TodayPastesProps {
	todayPastes: number | undefined;
}

const TodayPastes: React.FC<TodayPastesProps> = ({ todayPastes }) => {
	return <div className="today-pastes">{todayPastes || <Loader />}</div>;
};

export default TodayPastes;
