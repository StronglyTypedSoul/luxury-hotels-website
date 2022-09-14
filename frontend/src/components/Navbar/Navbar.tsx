import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="links">
				<NavLink to="/">
					<span>Dashboard</span>
				</NavLink>
				<NavLink to="/pastes">
					<span>Pastes</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
