import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<div>
				<NavLink to="/">Live</NavLink>
				{"  "}
				<NavLink to="favourite">Favourite</NavLink>
			</div>
		</nav>
	);
};

export default NavBar;
