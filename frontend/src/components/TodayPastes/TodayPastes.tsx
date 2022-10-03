import "./TodayPastes.scss";
import Loader from "../Loader/Loader";

interface TodayPastesProps {
	todayPastes: number | undefined;
}

const TodayPastes: React.FC<TodayPastesProps> = ({ todayPastes }) => {
	const currentHour = new Date().getHours();
	const pastesPerHour = todayPastes && (todayPastes / currentHour).toFixed(1);

	return (
		<div className="today-pastes">
			{todayPastes !== undefined ? (
				<>
					<p>
						<span className="count">{todayPastes}</span> new pastes were scraped since midnight. {"That's"} a rate of{" "}
						<span className="rate">{pastesPerHour}</span> pastes per hour
					</p>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default TodayPastes;
