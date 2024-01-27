import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<div>
				<NavLink to="/">Live</NavLink>
				{"  "}
				<NavLink to="favorites">Favorites</NavLink>
			</div>
		</nav>
	);
};

export default NavBar;
