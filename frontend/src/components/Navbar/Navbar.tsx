import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.scss";

const Navbar: React.FC = () => {
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
			<FaBell className="notifications" />
		</nav>
	);
};

export default Navbar;
