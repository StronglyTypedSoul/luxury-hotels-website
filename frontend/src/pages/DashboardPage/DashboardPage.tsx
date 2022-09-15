import { useEffect, useState } from "react";
import "./DashboardPage.scss";
import TotalPastes from "../../components/TotalPastes/TotalPastes";
import TodayPastes from "../../components/TodayPastes/TodayPastes";
import TopAuthors from "../../components/TopAuthors/TopAuthors";
import TagsDiagram from "../../components/TagsDiagram/TagsDiagram";
import { IDashboardComponents, getDashboardComponents } from "../../api/endpoints";

const DashboardPage: React.FC = () => {
	const [dashboardComponents, setDashboardComponents] = useState<IDashboardComponents | undefined>(undefined);

	useEffect(() => {
		getDashboardComponents().then((dashboardComponents) => {
			setDashboardComponents(dashboardComponents);
		});
	}, []);

	return (
		<div className="dashboard-page">
			<div className="features-container">
				<TotalPastes totalPastes={dashboardComponents?.totalPastes} />
				<TodayPastes todayPastes={dashboardComponents?.todayPastes} />
				<TopAuthors topAuthors={dashboardComponents?.topAuthors} />
				<TagsDiagram tags={dashboardComponents?.tags} />
			</div>
		</div>
	);
};

export default DashboardPage;
