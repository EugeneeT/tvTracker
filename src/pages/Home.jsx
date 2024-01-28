// App.js
import React from "react";
import { AppProvider } from "../components/appContext";
import UserInput from "../components/userInput";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const Home = () => {

	const headerStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '15vh',
		background: '#333',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		zIndex: '99',
	};

	const footerStyle = {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		height: '10vh',
		background: '#333',
		display: 'flex',
		flexDirection: "column",
		alignItems: 'center',
		zIndex: '99',
	}

	const mainStyle = {
		position: 'fixed',
		top: '15vh',
		bottom: '10vh',
		left: 0,
		width: '100%',
		maxHeight: '75vh', // Set a max height for the main container
	};

	return (
		<>
			<header style={headerStyle}>
				<NavBar />
				<UserInput />
			</header>
			<main style={mainStyle}>
				<Outlet />
			</main>
			<footer style={footerStyle}>{/* <Footer /> */}</footer>
		</>
	);
};

const HomeWrapper = () => {
	return (
		<AppProvider>
			<Home />
		</AppProvider>
	);
};

export default HomeWrapper;
