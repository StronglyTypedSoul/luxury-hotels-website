import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { IPaste, ICompactPaste } from "../../interfaces/paste";

const Navbar: React.FC = () => {
	const [notifications, setNotifications] = useState<string[]>([]);
	const [showNotifications, setShowNotifications] = useState(false);

	const socket = useSocket();

	useEffect(() => {
		socket.on("new_pastes", (pastes: ICompactPaste[]) => {
			const newNotifications: string[] = [];
			const count = pastes.length;
			if (count > 0) {
				const countMsg = `${count} new paste${count > 1 ? "s were" : " was"} scraped while you were offline`;
				newNotifications.push(countMsg);
			}
			// TODO: check tags
			setNotifications((prevNotifications) => [...newNotifications, ...prevNotifications]);
		});
		socket.on("scraping_done", (msg: { error: boolean; pastes: ICompactPaste[] }) => {
			let newNotification = "";
			if (msg.error) {
				newNotification = "Scraping process failed";
			} else {
				newNotification = "Scraping process succeeded\n";
				const count = msg.pastes.length;
				if (count > 0) {
					newNotification += `${count} new paste${count > 1 ? "s were" : " was"} scraped`;
				} else {
					newNotification += "No new pastes were scraped";
				}
			}
			setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
		});
		return () => {
			socket.off("new_pastes");
			socket.off("scraping_done");
		};
	}, []);

	const toggleNotifications = () => {
		if (showNotifications) {
			setNotifications([]);
			setShowNotifications(false);
		} else {
			setShowNotifications(true);
		}
	};

	return (
		<nav className="navbar">
			<div className="links">
				<NavLink to="/" end>
					<span>Dashboard</span>
					<div></div>
				</NavLink>
				<NavLink to="/pastes">
					<span>Pastes</span>
					<div></div>
				</NavLink>
			</div>
			<div className="notifications">
				<FaBell onClick={() => toggleNotifications()} />
				{notifications.length > 0 && <div className="notifications-counter">{notifications.length}</div>}
				{showNotifications && (
					<div className="notifications-container">
						{notifications.length > 0 ? (
							<>
								{notifications.map((notification, index) => {
									return (
										<div key={index} className="notification">
											{notification}
										</div>
									);
								})}
							</>
						) : (
							<div className="notification">There is nothing new</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
