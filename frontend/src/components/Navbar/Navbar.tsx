import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Navbar.scss";
import useNotifications from "../../hooks/useNotifications";

const Navbar: React.FC = () => {
	const [showNotifications, setShowNotifications] = useState(false);
	const [notifications, setNotifications] = useNotifications();

	useEffect(() => {
		document.addEventListener("click", clickOutsideNotifications);
		return () => {
			document.removeEventListener("click", clickOutsideNotifications);
		};
	}, [showNotifications]);

	const clickOutsideNotifications = () => {
		if (showNotifications) toggleNotifications();
	};

	const toggleNotifications = () => {
		if (showNotifications) setNotifications([]);
		setShowNotifications((prevShowNotifications) => !prevShowNotifications);
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
				<NavLink to="/personal">
					<span>Personal</span>
					<div></div>
				</NavLink>
			</div>
			<div className="notifications">
				<FaBell
					onClick={(e) => {
						e.stopPropagation();
						toggleNotifications();
					}}
				/>
				{notifications.length > 0 && <div className="notifications-counter">{notifications.length}</div>}
				{showNotifications && (
					<div className="notifications-container" onClick={(e) => e.stopPropagation()}>
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
