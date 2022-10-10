import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.scss";
import { useState } from "react";

const Navbar: React.FC = () => {
	const [notifications, setNotifications] = useState(5);
	const [showNotifications, setShowNotifications] = useState(false);

	const toggleNotifications = () => {
		if (showNotifications) {
			setNotifications(0);
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
				<div className="notifications-counter">{notifications}</div>
				{showNotifications && (
					<div className="notifications-container">
						<div className="notification"></div>
						<div className="notification"></div>
						<div className="notification"></div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
