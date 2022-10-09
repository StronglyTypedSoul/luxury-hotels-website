import { useEffect, useState } from "react";
import "./DashboardPage.scss";
import TotalPastes from "../../components/TotalPastes/TotalPastes";
import TodayPastes from "../../components/TodayPastes/TodayPastes";
import TopAuthors from "../../components/TopAuthors/TopAuthors";
import TagsDiagram from "../../components/TagsDiagram/TagsDiagram";
import { IDashboardComponents, getDashboardComponents } from "../../api/endpoints";
import useSocket from "../../hooks/useSocket";

const DashboardPage: React.FC = () => {
	const [dashboardComponents, setDashboardComponents] = useState<IDashboardComponents | undefined>(undefined);
	const socket = useSocket();

	useEffect(() => {
		socket.on("scraping_done", async (data) => {
			if (!data.error && data.pastes.length > 0) {
				const newDashboardComponents = await getDashboardComponents();
				setDashboardComponents(newDashboardComponents);
			}
		});
		getDashboardComponents().then((newDashboardComponents) => {
			setDashboardComponents(newDashboardComponents);
		});
		return () => {
			socket.off("scraping_done");
		};
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
