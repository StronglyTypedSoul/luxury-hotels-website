import "./DashboardPage.scss";
import TotalPastes from "../../components/TotalPastes/TotalPastes";
import TodayPastes from "../../components/TodayPastes/TodayPastes";
import TopAuthors from "../../components/TopAuthors/TopAuthors";
import TagsDiagram from "../../components/TagsDiagram/TagsDiagram";

const DashboardPage: React.FC = () => {
	return (
		<div className="dashboard-page">
			<div className="features-container">
				<TotalPastes />
				<TodayPastes />
				<TopAuthors />
				<TagsDiagram />
			</div>
		</div>
	);
};

export default DashboardPage;
