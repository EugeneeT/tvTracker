//NavBar.jsx

// 1. import needed functions and dependencies
import { NavLink } from "react-router-dom";

// Styles for div and NavLink sections

const navStyle = {
	margin: '0 10px',
	textDecoration: 'none', // Remove underline
	fontWeight: 'bold',    // Set font weight to bold
	fontSize: '20px',
	color: 'white',         // Set text color to black

};

const navContainerStyle = {
	margin: "1rem 0",
	display: "flex",
	alignItems: "center",
};


const NavBar = () => {
	return (
		<nav>
			<div style={navContainerStyle}>
				<NavLink to="/" style={navStyle}>Live</NavLink>
				{"  "}
				<NavLink to="favorite" style={navStyle}>Favorite</NavLink>
			</div>
		</nav>
	);
};

export default NavBar;
