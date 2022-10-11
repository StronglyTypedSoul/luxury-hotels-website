import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { ICompactPaste } from "../../interfaces/paste";
import { FaBell } from "react-icons/fa";
import "./Navbar.scss";

const Navbar: React.FC = () => {
	const [notifications, setNotifications] = useState<string[]>([]);
	const [showNotifications, setShowNotifications] = useState(false);

	const socket = useSocket();

	useEffect(() => {
		socket.on("new_pastes", (pastes: ICompactPaste[]) => {
			if (pastes.length === 0) return;
			let newNotification = `${pastes.length} new paste${pastes.length > 1 ? "s were" : " was"} scraped while you were offline.`;
			const watchedTags = localStorage.getItem("watchedTags");
			if (!watchedTags || watchedTags.length === 0) return;
			const receivedTags: { [key: string]: number } = {};
			pastes.forEach(({ tags }) => {
				tags.forEach((tag) => {
					if (receivedTags[tag]) receivedTags[tag]++;
					else receivedTags[tag] = 1;
				});
			});
			for (const tag in receivedTags) {
				if (watchedTags.includes(tag)) {
					newNotification += pastes.length === 1 ? `\nIt's about ${tag}.` : `\n${receivedTags[tag]} of them is about ${tag}.`;
				}
			}
			setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
		});
		socket.on("scraping_done", (msg: { error: boolean; pastes: ICompactPaste[] }) => {
			let newNotification = "";
			if (msg.error) {
				newNotification = "Scraping process failed.";
			} else {
				newNotification = "Scraping process succeeded.\n";
				const count = msg.pastes.length;
				if (count > 0) {
					newNotification += `${count} new paste${count > 1 ? "s were" : " was"} scraped.`;
				} else {
					newNotification += "No new pastes were scraped.";
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
