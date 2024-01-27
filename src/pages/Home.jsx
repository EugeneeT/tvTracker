// App.js
import React from "react";
import { AppProvider } from "../components/appContext";
import UserInput from "../components/userInput";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const Home = () => {
	return (
		<>
			<header>
				<NavBar />
				<UserInput />
			</header>
			<main>
				<div className="leftDiv"></div>
				<Outlet />
				<div className="rightDiv"></div>
			</main>
			<footer>{/* <Footer /> */}</footer>
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
